import { connectMongoDB } from "@/dblib/dbmongo";

import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        
        const body = await request.json();

        await connectMongoDB();

        const db = mongoose.connection;

 
         let pendinglist=[];
 
        { body.branchid==19 ?
            pendinglist = await db.collection('pendingissuecash').find().toArray()
             :
            pendinglist = await db.collection('pendingissuecash').find({ branchid:parseInt(body.branchid) }).toArray()       
        }

  
        return NextResponse.json(pendinglist);

       

    } catch (error) {
        console.log(error);
    }
}