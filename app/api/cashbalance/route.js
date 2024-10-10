import { connectMongoDB } from "@/dblib/dbmongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
 
export const dynamic ='force-dynamic';
export async function POST(request) {
    try {
        const body = await request.json();
 
        await connectMongoDB();

        let balancedata= [];

        const db = mongoose.connection;

        const branchId = body.branchid;

        const financebalance_aggregate = [
            {
              $group: {
                _id: parseInt(`${branchId}`),
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

        const branchbalance_aggregate = [
            {
              $match: {
                branchid: parseInt(`${branchId}`),
              }
            },
            {
              $group: {
                _id: parseInt(`${branchId}`),
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
 
      //console.log(branchbalance_aggregate);

        {
           parseInt(body.branchid) == 19 ?
           // balancedata = await db.collection('financecashbalance').find().toArray()
           balancedata = await db.collection('financecashbooks').aggregate(financebalance_aggregate).toArray()
           
            :
            //balancedata = await db.collection('branchcashbalance').find({ _id:parseInt(body.branchid)}).toArray()
            balancedata = await db.collection('branchcashbooks').aggregate(branchbalance_aggregate).toArray()
        } 
       
        //console.log(balancedata);
    
       return NextResponse.json(balancedata);
 
    }
    catch (error) {
      return new NextResponse("Error " + error.message, {status:500});
    }
}

 