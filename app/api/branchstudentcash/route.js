import { connectMongoDB } from "@/dblib/dbmongo";
import Branchcashbook from "@/model/branchcash";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose"

export async function POST(request) {
    try {
        
        const body = await request.json();

        await connectMongoDB();
        
        let query = { comid: body.comid, iscancel: null, isreject: false, entrytype: "R", category: /School Fee/ }
 
        let companydata;
 
       // companydata = await Branchcashbook.find(query).select("_id entrydate entrytype category description feedetail.rollno feedetail.student_name feedetail.challanid totalamount remarks").sort({ _id: -1 })
 

       const data = await Branchcashbook.find(query)
         .select("_id entrydate entrytype category description feedetail.rollno feedetail.student_name feedetail.challanid totalamount remarks")
         .sort({ _id: -1 })
         .lean(); // This makes the result plain JavaScript objects
       
       companydata = data.map(doc => {
         return {
           _id: doc._id,
           entrydate: doc.entrydate,
           entrytype: doc.entrytype,
           category: doc.category,
           description: doc.description,
           feedetail: {
             rollno: doc.feedetail?.rollno || "Manual",
             student_name: doc.feedetail?.student_name || "",
             challanid: doc.feedetail?.challanid || "",
           },
           totalamount: doc.totalamount,
           remarks: doc.remarks,
         };
       });

 
        return NextResponse.json(companydata);
 
    } catch (error) {
        return new NextResponse("Error " + error.message, {status:500});
       
    }
}


// return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
//     status: 500,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });