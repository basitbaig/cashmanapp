import { connectMongoDB } from "@/dblib/mongodb";
import Branchcashbook from "@/model/branchcash";
import Financecashbook from "@/model/hofincash";
import { NextResponse, NextRequest } from "next/server";
 
export async function POST(request) {
   
    try {

        const body = await request.json();

        console.log('---ISsue Cash API-----')
        console.log(body);
   
        //const { comid, branchid, username,entrydate,entrytype,category,description,totalamount,remarks } = await request.json();
  
        console.log(body.branchid);


        let ispending = Boolean(0);
        let isposted = Boolean(0);
     
         {  //entrytype === "R" && (isposted = !!0);
            body.entrytype === "R" && (isposted = Boolean(1));
         }
         {
            body.entrytype === "I" && (ispending = Boolean(1));
         }
 
        await connectMongoDB();

        {
            body.branchid == 19 ?
            await Financecashbook.create({ 
                comid:parseInt(body.comid), 
                branchid:parseInt(body.branchid), 
                username:body.username, 
                entrydate:body.entrydate, 
                entrytype:body.entrytype, 
                issuetobranch:null,
                recevfrombranch:null,
                category:body.category,
                description:body.description,
                totalamount:parseInt(body.totalamount),
                remarks:body.remarks,
                isposted:isposted,
                ispending:ispending,
                iscancel:null
            }) :
            await Branchcashbook.create({ 
                comid:parseInt(body.comid), 
                branchid:parseInt(body.branchid), 
                username:body.username, 
                entrydate:body.entrydate, 
                entrytype:body.entrytype, 
                issuetobranch:null,
                recevfrombranch:null,
                category:body.category,
                description:body.description,
                totalamount:parseInt(body.totalamount),
                remarks:body.remarks,
                isposted:isposted,
                ispending:ispending,
                iscancel:null
            })


        }
 
        return NextResponse.json({message: "Amount Issued"},{status: 201});
    } catch (error) {
        
        console.log('Error Step-4 - Try Block Error');

        return  NextResponse.json({message: "Error In Amount Issuance"},{status: 500});     
    }
}