import { connectMongoDB } from "@/dblib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        const body = await request.json();
 
        await connectMongoDB();

        let balancedata= [];

        const db = mongoose.connection;

        // const mybranch = JSON.parse(body.branchid);
     
        
        {
            body.branchid == 19 ?
            balancedata = await db.collection('financecashbalance').find().toArray()
            :
            balancedata = await db.collection('branchcashbalance').find({ _id:parseInt(body.branchid)}).toArray()
        } 
       
        //Object.values(balancedata)
       return NextResponse.json(balancedata);

        

    }
    catch (error) {
        console.log(error);
    }
}



 // if (branchid==19)
        // {
        //     balancedata = await db.collection('financecashbalance').find({}).toArray();           
        // }
        // else
        // {
        //     balancedata = await db.collection('branchcashbalance').find({}).toArray();
        // }
 
      // const [result] = balancedata;
      
         

        // console.log(mybranch)
        // console.log('--Filter Apply---');
        // console.log(balancedata.filter(o => o._id === mybranch))

        //const filteredHomes = json.homes.filter( x => 
        //   x.price <= 1000 && 
        //   x.sqft >= 500 && 
        //   x.num_of_beds >=2 && 
        //   x.num_of_baths >= 2.5
        // );

        //Object.values(balancedata)
        
        //_id: branchid 
            // {
            //   branchid == 0 ?
            //     balancedata = await db.collection('branchcashbalance').find({}).toArray()
            //     :
            //     balancedata = await db.collection('branchcashbalance').find({ _id: branchid }).toArray()
            // }        
            //console.log(Object.values(balancedata));
 
 
        // setTimeout(() => {
        //     (console.log(balancedata));
        // }, 10000);
  
       

       
 
       //return new NextResponse.json({balancedata})




// const data = await Branchcashbook.aggregate([
//     // Your aggregate pipeline stages go here
//     // For example:
//     {
//         $group: {
//             _id: "$branchid",
//             TotalReceive: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $eq: ["$entrytype", "R"],
//                         },
//                         "$totalamount",
//                         0,
//                     ],
//                 },
//             },
//             TotalIssue: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $eq: ["$entrytype", "I"],
//                         },
//                         "$totalamount",
//                         0,
//                     ],
//                 },
//             },
//         },
//     },
//     {
//         $addFields: {
//             Balance: {
//                 $subtract: [
//                     "$TotalReceive",
//                     "$TotalIssue",
//                 ],
//             },
//         },
//     },

// ])

// Close the database connection
//await mongoose.connection.close();

//return NextResponse.json({data});

// return {
//     props: {
//         data,
//     },
// };
