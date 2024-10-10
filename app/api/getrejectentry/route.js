import { connectMongoDB } from "@/dblib/dbmongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

 
export async function POST(request) {
  try {
      const body = await request.json();
      await connectMongoDB();

 
      const rejectissuecash_aggregate =[
        {
          $match: {
            branchid: parseInt(`${body.branchid}`),
            ispending: false,
            isreject: true,
            iscancel: null
          }
        },
        {
          $lookup: {
            from: "branchlists",
            localField: "branchid",
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
            branchid: 1,
            entrydate: 1,
            remarks: 1,
            description:1,
            totalamount: 1,
            branchname: "$lookup.branchname"
          }
        }
      ];

      //let pendingEntry =[];
      
      const rejectEntry = await mongoose.connection.collection('branchcashbooks').aggregate(rejectissuecash_aggregate).toArray();

      return NextResponse.json(rejectEntry);

  } catch (error) {
     
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}