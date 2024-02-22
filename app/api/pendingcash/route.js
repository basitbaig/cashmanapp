import { connectMongoDB } from "@/dblib/mongodb";

import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        
        const body = await request.json();

        await connectMongoDB();

        const db = mongoose.connection;

        // let pendinglist=[];

        // pendinglist = await db.collection('cashexpheads').find({ headtype: body }).toArray();
 
        // return NextResponse.json(headlist);
    

         let pendinglist=[];
 
        { body.branchid==19 ?
            pendinglist = await db.collection('pendingissuecash').find().toArray()
             :
            pendinglist = await db.collection('pendingissuecash').find({ branchid:parseInt(body.branchid) }).toArray()       
        }

        // console.log('---API Call Area-----');
        // console.log(pendinglist);
        
        return NextResponse.json(pendinglist);

    } catch (error) {
        console.log(error);
    }
}