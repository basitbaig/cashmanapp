import mongoose from "mongoose"

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected Successfully....");
    } catch (error) {
        console.error("Error Connection MongoDB Database..", error);
    }

}

// export async function getServerSideProps() {
//     try {
//         // Connect to the database
//         await connectMongoDB();
  
//         //db.branchcashbooks.aggregate( [ { $group:{ _id: { branch:"$branchid", enttype:"$entrytype"} , Total:{ $sum: "$totalamount" } } }  ])
//         // Perform the aggregate query
//         const data = await Branchcashbook.aggregate([
//             // Your aggregate pipeline stages go here
//             // For example:
//             {
//                 $group: {
//                     _id: "$branchid",
//                     TotalReceive: {
//                         $sum: {
//                             $cond: [
//                                 {
//                                     $eq: ["$entrytype", "R"],
//                                 },
//                                 "$totalamount",
//                                 0,
//                             ],
//                         },
//                     },
//                     TotalIssue: {
//                         $sum: {
//                             $cond: [
//                                 {
//                                     $eq: ["$entrytype", "I"],
//                                 },
//                                 "$totalamount",
//                                 0,
//                             ],
//                         },
//                     },
//                 },
//             },
//             {
//                 $addFields: {
//                     Balance: {
//                         $subtract: [
//                             "$TotalReceive",
//                             "$TotalIssue",
//                         ],
//                     },
//                 },
//             },

//         ])

//         // Close the database connection
//         //await mongoose.connection.close();

//         //return NextResponse.json({data});

//         return {
//             props: {
//                 data,
//             },
//         };

//     }
//     catch (error) {
//         console.log(error);
//     }
// }





// https://www.mongodb.com/docs/manual/core/aggregation-pipeline/

// db.collectionX.aggregate([
//     {
//       $group: {
//         _id: null,
//         sumOfDifferences: { $sum: { $subtract: ['$itemTwo', '$itemOne']}
//     }
//   ])

// db.branchcashbooks.aggregate(
//     [
//        {
//           $project:
//             {
//               branchid: 1,
//               totalrecv:
//                 {
//                   $cond: { if: { $eq: [ "$entrytype", "R" ] }, then: {$sum: ["$totalamount"]}, else: 0 }
//                 },
//                 totalissue:
//                 {
//                   $cond: { if: { $eq: [ "$entrytype", "I" ] }, then: {$sum: ["$totalamount"]}, else: 0 }
//                 },                
//                 $group: {
//                     _id: null,
//                     BalanceInHand: { $sum: { $subtract: ['$totalrecv', '$totalissue']}}
//                 }
//             }
//        }
//     ]
//  )


//https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/

//https://medium.com/@dangeabunea/creating-and-querying-views-in-mongodb-d05b560d4fe2
//Create View by Joining Two Collections and get the data
//Here Collection1 is: "flights" and the Colleciton2 is: "aircraft"
//The Joining fields are, from Flights it is "aircraftId" and from Aircraft it is "_id".

// db.createView("detailedFlights", "flights", [
//     {
//         $lookup: {
//             from: "aircraft", localField: "_id", foreignField: "aircraftId", as: "lookup"
//         }
//     }
// ])


// all the documents in the view
// db.getCollection("detailedFlights").find({})

// // paging
// db.getCollection("detailedFlights").find({}).skip(1).take(1)

// // count all the documents in the view
// db.getCollection("detailedFlights").countDocuments({})

// // all the documents departing from Paris
// db.getCollection("detailedFlights").find({"from": "Paris"})

// // all the documents where aircraft contains Airbus
// db.getCollection("detailedFlights").find({"aircraft": {$regex: "Airbus"}})