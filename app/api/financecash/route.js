import { connectMongoDB } from "@/dblib/dbmongo";
import Financecashbook from "@/model/hofincash";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request) {
    try {
        
        const  body = await request.json();
 
        await connectMongoDB();
 
        const branch = await Financecashbook.find({branchid: body.branchid}).select("entrydate entrytype category description totalamount remarks iscancel").sort({ _id: -1 });

   
        return NextResponse.json({branch});

    } catch (error) {
        console.log(error);
    }
}