import { connectMongoDB } from "@/dblib/mongodb";
import Branchcashbook from "@/model/branchcash";
import Financecashbook from "@/model/hofincash";
import { NextResponse, NextRequest } from "next/server";
 
export async function POST(request) {
   
    try {
   
        const { comid, branchid, username,entrydate,entrytype,category,description,totalamount,remarks } = await request.json();
  
        let ispending = Boolean(0);
        let isposted = Boolean(0);
     
         {  //entrytype === "R" && (isposted = !!0);
            entrytype === "R" && (isposted = Boolean(1));
         }
         {
            entrytype === "I" && (ispending = Boolean(1));
         }
 
        await connectMongoDB();

        {
            loginbranch == 19 ?
            await Financecashbook.create({ 
                comid:parseInt(comid), 
                branchid:parseInt(branchid), 
                username:username, 
                entrydate:entrydate, 
                entrytype:entrytype, 
                issuetobranch:null,
                recevfrombranch:null,
                category:category,
                description:description,
                totalamount:parseInt(totalamount),
                remarks:remarks,
                isposted: isposted,
                ispending:ispending,
                iscancel:null
            }) :
            await Branchcashbook.create({ 
                comid:parseInt(comid), 
                branchid:parseInt(branchid), 
                username:username, 
                entrydate:entrydate, 
                entrytype:entrytype, 
                issuetobranch:null,
                recevfrombranch:null,
                category:category,
                description:description,
                totalamount:parseInt(totalamount),
                remarks:remarks,
                isposted: isposted,
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