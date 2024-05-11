import { connectMongoDB } from "@/dblib/dbmongo";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    try {
 
        await connectMongoDB();
 
        let balancedata = [];

        const db = mongoose.connection;

        balancedata = await db.collection('branchcashbalance').find().toArray()

 
        return NextResponse.json(balancedata);
 
    }
    catch (error) {
        console.log(error);
    }
}

 