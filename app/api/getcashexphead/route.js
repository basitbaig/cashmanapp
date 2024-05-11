import { connectMongoDB } from "@/dblib/dbmongo";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        const  body  = await request.json();
 
        await connectMongoDB();
 
        const db = mongoose.connection;

        let htype = body.entrytype;
        let hmode = body.entrymode;

 
        let headlist=[];

        { body.entrytype == "undefined" ?           
            headlist = await db.collection('cashexpheads').find({headmode: hmode }).toArray()
          :
            headlist = await db.collection('cashexpheads').find({ headtype: htype, headmode: hmode }).toArray();
        }
       
        return NextResponse.json(headlist);

    }
    catch (error) {
        console.log(error);
    }
}