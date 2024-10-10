import { connectMongoDB } from "@/dblib/dbmongo";
import Branchcashbook from "@/model/branchcash";
import Financecashbook from "@/model/hofincash";
import { NextResponse, NextRequest } from "next/server";
 
export async function POST(request) {
   
    try {

        const body = await request.json();
 
        let ispending = parseInt(body.branchid)==19 ? Boolean(0) : Boolean(1);
        let isposted = parseInt(body.branchid) == 19 ? Boolean(1) : Boolean(0);
 
        await connectMongoDB();

        {
            body.branchid == 19 ?
            await Financecashbook.create({ 
                comid:parseInt(body.comid), 
                branchid:parseInt(body.branchid), 
                username:body.username, 
                entrydate:body.entrydate, 
                entrytype:body.entrytype, 
                category:body.category,
                description:body.description,
                totalamount:parseInt(body.totalamount),
                remarks:body.remarks,
                isposted:isposted,
                ispending:ispending,
            }) :
            await Branchcashbook.create({ 
                comid:parseInt(body.comid), 
                branchid:parseInt(body.branchid), 
                username:body.username, 
                entrydate:body.entrydate, 
                entrytype:body.entrytype, 
                category:body.category=='' ? "Cash To Head Office" : body.category,
                description:body.description,
                totalamount:parseInt(body.totalamount),
                remarks:body.remarks,
                isposted:isposted,
                ispending:ispending,
            })
        }
 
        return NextResponse.json({message: "Amount Issued"},{status: 201});
        
    } catch (error) {
  
        return  new NextResponse.json({message: "Error In Cash Issuance"},{status: 500});     
    }
}

 