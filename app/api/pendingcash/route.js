import { connectMongoDB } from "@/dblib/dbmongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    try {

        const body = await request.json();
        await connectMongoDB();
        const db = mongoose.connection;

        const branchId = body.branchid;

        const pendingissuecash_aggregate = [
            {
              $match: {
                ispending: true,
                isreject: false,
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
                description: 1,
                totalamount: 1,
                branchname: "$lookup.branchname"
              }
            }
          ]

          const pendingissuecashbranch_aggregate = [
            {
              $match: {
                branchid: parseInt(`${branchId}`),
                ispending: true,
                isreject: false,
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
                description: 1,
                totalamount: 1,
                branchname: "$lookup.branchname"
              }
            }
          ]          

         let pendinglist=[];

        { parseInt(body.branchid)==19 ?
           // pendinglist = await db.collection('pendingissuecash').find().toArray()
            pendinglist = await db.collection('branchcashbooks').aggregate(pendingissuecash_aggregate).toArray()
             :
           // pendinglist = await db.collection('pendingissuecash').find({ branchid:parseInt(body.branchid) }).toArray()       
            pendinglist = await db.collection('branchcashbooks').aggregate(pendingissuecashbranch_aggregate).toArray() 

        }

        return NextResponse.json(pendinglist);

       
    } catch (error) {
      return NextResponse.json({ message: "Error In Pending Transaction" }, { status: 500 });
    }
}