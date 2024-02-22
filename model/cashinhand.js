import mongoose from "mongoose";

// const branchcashbalance = mongoose.model('branchcashbalance', {
//   _id: Number,
//   totalreceive: Number,
//   totalissue: Number,
//   balance: Number
// });

export const GetBranchBalances = async ({ branchid }) => {

  // console.log('--Call For Getting Branch Cash Balance---');

  // console.log(branchid);

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const db = mongoose.connection;

    let balancedata = await db.collection('branchcashbalance').find({}).toArray()

    // let balancedata;

    // {
    //   branchid == 0 ?
    //     balancedata = await db.collection('branchcashbalance').find({}).toArray()
    //     :
    //     balancedata = await db.collection('branchcashbalance').find({ _id: branchid }).toArray()
    // }

    //console.log('--Get Data From View---Wait on Timeout---');

    //console.log(balancedata);

        // setTimeout(() => {
        //         (console.log(balancedata));
        //     }, 10000);

    //await mongoose.connection.close();

    return balancedata;



    // const baldata = await (await mongoose.connect(process.env.MONGODB_URI)).Aggregate(
    //     [
    //         {
    //             $group: {
    //                 _id: "$branchid",
    //                 totalreceive: {
    //                     $sum: {
    //                         $cond: [
    //                             {
    //                                 $eq: ["$entrytype", "R"],
    //                             },
    //                             "$totalamount",
    //                             0,
    //                         ],
    //                     },
    //                 },
    //                 totalissue: {
    //                     $sum: {
    //                         $cond: [
    //                             {
    //                                 $eq: ["$entrytype", "I"],
    //                             },
    //                             "$totalamount",
    //                             0,
    //                         ],
    //                     },
    //                 },
    //             },
    //         },
    //         {
    //             $addFields: {
    //                 balance: {
    //                     $subtract: [
    //                         "$totalreceive",
    //                         "$totalissue",
    //                     ],
    //                 },
    //             },
    //         },
    //     ])
    // return {
    //   props: {
    //     balancedata,
    //   },
    // };


  } catch (error) {
    console.error("Error Connection MongoDB Database..", error);
  }

}