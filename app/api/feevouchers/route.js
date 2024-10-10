import { connectMongoDB } from "@/dblib/dbmongo";
import FeeVoucher from "@/model/feevoucher";
import Branchcashbook from "@/model/branchcash";
import { NextResponse, NextRequest } from "next/server";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

export async function GET() {

    await connectMongoDB();
    const parsedData = await FeeVoucher.find({ islock: true, isposted: false });

    return Response.json(parsedData)
}

export async function POST(request) {
    try {
 
        const feerecord = await request.json();

        await connectMongoDB();
        const feeData = new FeeVoucher(feerecord);
        await feeData.save();

        await FeeVoucher.updateMany({ islock: false, isposted: false }, { islock: true });

        let currentDate = new Date();

        let ispending = Boolean(0);
        let isposted = Boolean(1);

        let comid, branchid, username, entrydate, entrytype, category, description, totalamount, remarks;

        const newFeeData = await FeeVoucher.find({ islock: true, isposted: false })

        newFeeData.map((item) => {
            Branchcashbook.create({
                comid: parseInt(item.comid),
                branchid: parseInt(item.branchid),
                username: "Branch User",
                category: "School Fee Collection",
                entrydate: item.receivedate,
                entrytype: "R",
                description: item.challanid,
                feedetail: { billid: item.feebillid, rollno: item.rollno, student_name: item.studentname, feemonths: item.feemonths, challanid: item.challanid },
                totalamount: parseInt(item.totalamount),
                remarks: item.description,
                isposted: isposted,
                ispending: ispending,
                iscancel: null
            })


        });


        const filter = { isposted: false, islock: true }
        await FeeVoucher.updateMany(filter, { isposted: true });

     

        return new Response(JSON.stringify({ message: "Fee Voucher Data Successfully Received From SimpliED" },
            { newFeeData }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 201,
        });
    } catch (error) {
        // return Response.json({newFeeData})

        return new NextResponse(JSON.stringify({ message: "Error in Fetching Fee Data From SimpliED" }, { Error: error }), { status: 500 });

    }
}

