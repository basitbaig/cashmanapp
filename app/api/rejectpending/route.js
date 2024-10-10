import { connectMongoDB } from "@/dblib/dbmongo";
import Branchcashbook from "@/model/branchcash";
import { NextResponse, NextRequest } from "next/server";



export async function PUT(request) {

    try {
        const body = await request.json();

        const transid = body.transid;

        const ObjectId = require('mongodb').ObjectId;

        await connectMongoDB();

        let query = { _id: new ObjectId(transid) };

        await Branchcashbook.findByIdAndUpdate(query, { isreject: 'true', ispending: 'false', rejectreason: body.rejectreason });


        return NextResponse.json({ message: "Transaction Reject Successfully..." }, { status: 200 });
    }
    catch (error) {
        return new NextResponse("Error " + error.message, { status: 500 });
    }

}