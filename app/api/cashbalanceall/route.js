import { connectMongoDB } from "@/dblib/dbmongo";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

export const dynamic ='force-dynamic';
export async function POST(request) {
    try {
 
        await connectMongoDB();
 
        let balancedata = [];

         

        const db = mongoose.connection;

        const branchcashbalance_aggregate = [
            {
              $group: {
                _id: "$branchid",
                totalreceive: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          {
                            $eq: ["$entrytype", "R"]
                          },
                          {
                            $eq: ["$iscancel", null]
                          }
                        ]
                      },
                      "$totalamount",
                      0
                    ]
                  }
                },
                totalissue: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          {
                            $eq: ["$entrytype", "I"]
                          },
                          {
                            $eq: ["$ispending", false]
                          },
                          {
                            $eq: ["$isreject", false]
                          },                          
                          {
                            $eq: ["$iscancel", null]
                          }
                        ]
                      },
                      "$totalamount",
                      0
                    ]
                  }
                }
              }
            },
            {
              $addFields: {
                balance: {
                  $subtract: [
                    "$totalreceive",
                    "$totalissue"
                  ]
                }
              }
            },
            {
              $lookup: {
                from: "branchlists",
                localField: "_id",
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
                _id: 1,
                totalreceive: 1,
                totalissue: 1,
                balance: 1,
                Branch: "$lookup.branchname"
              }
            }
          ]

        //balancedata = await db.collection('branchcashbalance').find().toArray()

        balancedata = await db.collection('branchcashbooks').aggregate(branchcashbalance_aggregate).toArray()

 
        return NextResponse.json(balancedata);
 
    }
    catch (error) {
      return new NextResponse("Error " + error.message, {status:500});
    }
}

 