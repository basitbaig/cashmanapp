import { connectMongoDB } from "@/dblib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
 

export async function GET() {
    try {
        
        await connectMongoDB();
        const db = mongoose.connection;

         let userlist=[];  

         userlist = await db.collection('userslist').find().toArray()
 
        return NextResponse.json(userlist);

    } catch (error) {
        console.log(error);
    }
}