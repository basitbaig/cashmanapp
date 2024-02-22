import { connectMongoDB } from "@/dblib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        const  body  = await request.json();
 
        await connectMongoDB();
 
        const db = mongoose.connection;

        //const htype = JSON.parse(headtype);
        let headlist=[];

        headlist = await db.collection('cashexpheads').find({ headtype: body }).toArray();
 
        return NextResponse.json(headlist);

    }
    catch (error) {
        console.log(error);
    }
}