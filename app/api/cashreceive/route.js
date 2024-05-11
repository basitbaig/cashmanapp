import { connectMongoDB } from "@/dblib/dbmongo";
import Branchcashbook from "@/model/branchcash";
import Financecashbook from "@/model/hofincash";
import { NextResponse, NextRequest } from "next/server";
 
export async function POST(request) {
   
    try {

       // const { comid, branchid, username,entrydate,entrytype,category,description,totalamount,remarks } = await request.json();       
        const body = await request.json();

       
        let ispending = Boolean(0);
        let isposted =  Boolean(1);
        let isreject =  Boolean(0);
 
         
        await connectMongoDB();

        {
            body.branchid == '19' ?
            await Financecashbook.create({ 
                comid:parseInt(body.comid), 
                branchid:parseInt(body.branchid), 
                username:body.username, 
                entrydate:body.entrydate, 
                entrytype:body.entrytype,                   
                category:body.category,
                brhtransid: null,
                description:body.description,
                totalamount:parseInt(body.totalamount),
                remarks:body.remarks,
                ispending:ispending,
                isposted:isposted,
            }) :
            await Branchcashbook.create({ 
                comid:parseInt(body.comid), 
                branchid:parseInt(body.branchid), 
                username:body.username, 
                entrydate:body.entrydate, 
                entrytype:body.entrytype,                
                category:body.category,
                description:body.description,
                totalamount:parseInt(body.totalamount),
                remarks:body.remarks,               
                ispending:ispending,
                isposted:isposted,
            })
        }

        return NextResponse.json({message: "Amount Received"},{status: 201});
        
    } catch (error) {
        
        return  NextResponse.json({message: "Error In Amount Receiving"},{status: 500});     
    }
}

 