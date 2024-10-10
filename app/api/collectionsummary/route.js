import { connectMongoDB } from "@/dblib/dbmongo";
import Branchcashbook from "@/model/branchcash";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose"

export async function POST(request) {
    try {
        
        const body = await request.json();
        await connectMongoDB();

 
        let collectionsummarydata = [];

        const db = mongoose.connection;

        const collectionsummary_aggregate = [
          {
            $match: {
              branchid: parseInt(`${body.branchid}`),
              entrytype: "R",
              iscancel: null,
              isreject: false,
            }
          },
          {
            $group: {
              _id: "$branchid",
              totalreceive: {
                $sum: "$totalamount"
              },
              entries: {
                $push: {
                  category: "$category",
                  entrydate: {
                    $dateToString: { format: "%Y-%m-%d", date: "$entrydate" }
                  },
                  totalamount: "$totalamount"
                }
              }
            }
          },
          {
            $unwind: {
              path: "$entries"
            }
          },
          {
            $group: {
              _id: {
                branchid: "$_id",
                category: "$entries.category",
                entrydate: "$entries.entrydate"
              },
              grosstotal: {
                $sum: "$entries.totalamount"
              }
            }
          },
          {
            $lookup: {
              from: "branchlists",
              localField: "_id.branchid",
              foreignField: "id",
              as: "lookup"
            }
          },
          {
            $unwind: {
              path: "$lookup"
            }
          },
          {
            $project: {
              _id: 0,
              branchid:"$_id.branchid",
              entrydate: "$_id.entrydate",
              Branch: "$lookup.branchname",
              category: "$_id.category",
              grosstotal: 1
            }
          }
        ]
 
        collectionsummarydata = await db.collection('branchcashbooks').aggregate(collectionsummary_aggregate).toArray()

        //console.log(collectionsummarydata);

        return NextResponse.json(collectionsummarydata);

    } catch (error) {
      
        return new Response(JSON.stringify({ message: error }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}


 