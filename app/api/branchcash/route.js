import { connectMongoDB } from "@/dblib/mongodb";
import Branchcashbook from "@/model/branchcash";
import Financecashbook from "@/model/hofincash";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose"

export async function POST(request) {
    try {
        
        const body = await request.json();

        await connectMongoDB();

        // const mybranch = JSON.parse(branchid);
        let branchdata;

        //{entrydate: {"$eq": ISODate('2024-03-14T00:00:00Z')}}

        //{ $expr: {$eq: [{ $dateToString: {date: ISODate(Date()), format: "%Y-%m-%d"}}, { $dateToString: {date: "$entrydate", format: "%Y-%m-%d"}}]}}
        //{ $expr: {$eq: ["2024-03-14", { $dateToString: {date: "$entrydate", format: "%Y-%m-%d"}}]}}

       //{ $expr: {$eq: [{ $dateToString: {date: "$entrydate", format: "%Y-%m-%d"}},{ $dateToString: {date: new Date(), format: "%Y-%m-%d"}}]}}

        //let query = { branchid: body.branchid, iscancel: null, $expr: {$eq: [{ $dateToString: {date: "$entrydate", format: "%Y-%m-%d"}},{ $dateToString: {date: new Date(), format: "%Y-%m-%d"}}]}}


        {
            typeof body.report === "undefined" ?           
            body.branchid == 19 ?
                    branchdata = await Financecashbook.find({ branchid: body.branchid, iscancel: null, $expr: {$eq: [{ $dateToString: {date: "$entrydate", format: "%Y-%m-%d"}},{ $dateToString: {date: new Date(), format: "%Y-%m-%d"}}]}}).select("_id entrydate entrytype category description totalamount remarks ispending iscancel isposted").sort({ _id: -1 })
                    :
                    branchdata = await Branchcashbook.find({ branchid: body.branchid, iscancel: null, $expr: {$eq: [{ $dateToString: {date: "$entrydate", format: "%Y-%m-%d"}},{ $dateToString: {date: new Date(), format: "%Y-%m-%d"}}]}}).select("_id entrydate entrytype category description totalamount remarks ispending isreject iscancel isposted").sort({ _id: -1 })          
            :   
            body.branchid == 19 ?               
               body.feehead == "undefined" || body.feehead =="" ?
                    branchdata = await Financecashbook.find({ branchid:body.branchid, iscancel: null }).select("_id entrydate entrytype category description totalamount remarks ispending iscancel isposted").sort({ _id: -1 })
                    :
                    branchdata = await Financecashbook.find({ branchid:body.branchid, category: body.feehead, iscancel: null }).select("_id entrydate entrytype category description totalamount remarks ispending iscancel isposted").sort({ _id: -1 })
                :
                body.feehead == "undefined" || body.feehead =="" ?
                    branchdata = await Branchcashbook.find({ branchid: body.branchid, iscancel: null }).select("_id entrydate entrytype category description totalamount remarks ispending isreject iscancel isposted").sort({ _id: -1 })
                    :
                    branchdata = await Branchcashbook.find({ branchid: body.branchid, category: body.feehead, iscancel: null }).select("_id entrydate entrytype category description totalamount remarks ispending isreject iscancel isposted").sort({ _id: -1 })
        }
        
        return NextResponse.json(branchdata);

    } catch (error) {
       
        console.log(error);
    }
}





// import { MongoClient } from "mongodb";
// // Replace the uri string with your MongoDB deployment's connection string.
// const uri = "<connection string uri>";
// const client = new MongoClient(uri);
// async function run() {
//   try {
    
//     // Get the database and collection on which to run the operation
//     const database = client.db("sample_mflix");
//     const movies = database.collection("movies");
//     // Query for movies that have a runtime less than 15 minutes
//     const query = { runtime: { $lt: 15 } };
//     const options = {
//       // Sort returned documents in ascending order by title (A->Z)
//       sort: { title: 1 },
//       // Include only the `title` and `imdb` fields in each returned document
//       projection: { _id: 0, title: 1, imdb: 1 },
//     };

//     // Execute query 
//     const cursor = movies.find(query, options);
//     // Print a message if no documents were found
//     if ((await movies.countDocuments(query)) === 0) {
//       console.log("No documents found!");
//     }
//     // Print returned documents
//     for await (const doc of cursor) {
//       console.dir(doc);
//     }
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);