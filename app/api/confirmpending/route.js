import { connectMongoDB } from "@/dblib/mongodb";

import Branchcashbook from "@/model/branchcash";
import { NextResponse, NextRequest } from "next/server";
 

export async function POST(request) {

    try {
        
        const { body } = await request.json();

        const transid = body.transid;

        await connectMongoDB();

        const ObjectId = require('mongodb').ObjectId;

        let query = {_id: new ObjectId(transid)};

        const res = await Branchcashbook.findOneAndUpdate(query, { $set: { ispending: 'false' } }, {
            returnNewDocument: true
        }, function (error, result) {
                // In this moment, you recive a result object or error

                // ... Your code when have result ... //

                console.log(result);
            });
         
        return NextResponse.json({ message: "Confirm Posting" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Error In Confirm Posting" }, { status: 500 });
    }
}