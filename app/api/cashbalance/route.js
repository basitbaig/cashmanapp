import { connectMongoDB } from "@/dblib/dbmongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        const body = await request.json();
 
        await connectMongoDB();

        let balancedata= [];

        const db = mongoose.connection;
 
        {
            body.branchid == 19 ?
            balancedata = await db.collection('financecashbalance').find().toArray()
            :
            balancedata = await db.collection('branchcashbalance').find({ _id:parseInt(body.branchid)}).toArray()
        } 
       
  
       return NextResponse.json(balancedata);
 
    }
    catch (error) {
        console.log(error);
    }
}

 