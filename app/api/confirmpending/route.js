import { connectMongoDB } from "@/dblib/mongodb";

import Branchcashbook from "@/model/branchcash";
import { NextResponse, NextRequest } from "next/server";
 

export async function POST(request) {

    try {
        
        const { body } = await request.json();

        const transid = body.transid;

        console.log('---API Body Call----')
        console.log(body.transid);

        
        await connectMongoDB();

        const ObjectId = require('mongodb').ObjectId;

        let query = {_id: new ObjectId(transid)};

        console.log('---API Call For Confirm----')
        console.log(query);

        
        const res = await Branchcashbook.findOneAndUpdate(query, { $set: { ispending: 'false' } }, {new: true})
         
        return NextResponse.json({ message: "Confirm Posting" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Error In Confirm Posting" }, { status: 500 });
    }
}