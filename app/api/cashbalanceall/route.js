import { connectMongoDB } from "@/dblib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        //const { branchid } = await req.json();

        await connectMongoDB();

        //await mongoose.connect(process.env.MONGODB_URI);
        //const balancedata = await GetBranchBalances({branchid});

        let balancedata = [];

        const db = mongoose.connection;

        balancedata = await db.collection('branchcashbalance').find().toArray()

        //return NextResponse.json(Object.values(balancedata));

        return NextResponse.json(balancedata);
 
    }
    catch (error) {
        console.log(error);
    }
}

 