import { connectMongoDB } from "@/dblib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        //const { comid } = await request.json();

        const  body  = await request.json();

        await connectMongoDB();
 
        const db = mongoose.connection;

        //const mycomp = JSON.parse(comid);
 
        let branchlist=[];

        if (body=="all")
        {
            branchlist = await db.collection('branchlists').find().toArray()
        }
        else
        {
            branchlist = await db.collection('branchlists').find({ comid: body }).toArray()
        }

        return NextResponse.json(branchlist);

    }
    catch (error) {
        console.log(error);
    }
}