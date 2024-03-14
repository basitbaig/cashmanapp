import { connectMongoDB } from "@/dblib/mongodb";
import FeeVoucher from "@/model/feevoucher";
import { NextResponse, NextRequest } from "next/server";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

const GET = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const parsedData = await response.json();
    return Response.json(parsedData)
}

const POST = async (request) => {
    try {
        const body = await request.json();

        await connectMongoDB();
        const feeData = new FeeVoucher(body);
        await feeData.save();
        
        return new NextResponse(JSON.stringify({message:"Fee Voucher Data Successfully Received From SimpliED"},feeData),{status:200});


    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error in Fetching Voucher Data From SimpliED"},feeData),{status:500});

    }
}


export {GET, POST}


///https://www.youtube.com/watch?v=-j7qvs3zKqM