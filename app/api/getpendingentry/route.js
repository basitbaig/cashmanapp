import { connectMongoDB } from "@/dblib/dbmongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// export async function POST(request) {
//     try {
        
//         const body = await request.json();

//         await connectMongoDB();

//         const db = mongoose.connection;

//         const transid = body.transactionid;
         
//         const ObjectId = require('mongodb').ObjectId;

//         //let trnid = {_id: new ObjectId(transid)};

//         let trnid = new ObjectId(transid);

//         const pendingissuecash_aggregate = [
//             {
//               $match: {
//                 _id: `${trnid}`,
//                 ispending: true,
//                 isreject: false,
//                 iscancel: null
//               }
//             },
//             {
//               $lookup: {
//                 from: "branchlists",
//                 localField: "branchid",
//                 foreignField: "id",
//                 as: "lookup"
//               }
//             },
//             {
//               $unwind: {
//                 path: "$lookup"
//               }
//             },
//             {
//               $project: {
//                 _id: 1,
//                 branchid: 1,
//                 entrydate: 1,
//                 description: 1,
//                 totalamount: 1,
//                 branchname: "$lookup.branchname"
//               }
//             }
//           ]

//         let pendingEntry=[];
//        // const pendingEntry = await db.collection('pendingissuecash').findOne(query);

//         pendingEntry = await db.collection('branchcashbooks').aggregate(pendingissuecash_aggregate).toArray();

//         const pendingdata ={pendingEntry};

//         return NextResponse.json(pendingdata);    

//     } catch (error) {
//         console.log(error);
//     }
// }

export async function POST(request) {
  try {
      const body = await request.json();
      await connectMongoDB();

      const transid = body.transactionid;
      const ObjectId = require('mongodb').ObjectId;
      const trnid = new ObjectId(transid);

      const pendingissuecash_aggregate = [
          {
              $match: {
                  _id: trnid, // use the ObjectId directly, not as a string
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
      ];

      //let pendingEntry =[];
      
      const pendingEntry = await mongoose.connection.collection('branchcashbooks').aggregate(pendingissuecash_aggregate).toArray();
 
      return NextResponse.json({ pendingEntry });

  } catch (error) {
     
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}