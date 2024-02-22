import { connectMongoDB } from "@/dblib/mongodb";
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

        //db.collection('pendingissuecash').find({ _id:"65b7a786629da69b5c2b14d8"})

        const pendingdata ={pendingEntry};

        //console.log(pendingdata);

        return NextResponse.json(pendingdata);    

    } catch (error) {
        console.log(error);
    }
}