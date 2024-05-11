import { connectMongoDB } from "@/dblib/dbmongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        
        const body = await request.json();

        await connectMongoDB();

        const db = mongoose.connection;

        const transid = body.transactionid;
         

        const ObjectId = require('mongodb').ObjectId;

        let query = {_id: new ObjectId(transid)};
 
        const pendingEntry = await db.collection('pendingissuecash').findOne(query);

 
        const pendingdata ={pendingEntry};

 
        return NextResponse.json(pendingdata);    

    } catch (error) {
        console.log(error);
    }
}