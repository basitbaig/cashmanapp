import { connectMongoDB } from "@/dblib/mongodb";
import FeeVoucher from "@/model/feevoucher";
import Branchcashbook from "@/model/branchcash";
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

        //Here We need to use this feeData Object and Insert record into Cashbookdb of Branch
        // comid: {type: Number, required: true},
        // branchid: {type: Number, required: true},
        // feebillid: {type: String, required: true},
        // rollno:{type: String, required: true},
        // studentname:{type: String, required: true},
        // feemonths: {type: String, required: true},
        // challanid: {type: Number, required: true},
        // totalamount: {type: Number, required: true},
        // receivedate: {type: Date, required: true},
        // description:{type: String},
        // isposted: {type: Boolean, default: false},
        // islock: {type: Boolean, default: false}

        let currentDate=new Date();

        let ispending = Boolean(0);
        let isposted = Boolean(1);

        let comid, branchid, username,entrydate,entrytype,category,description,totalamount,remarks;
        feeData.map((item) => {
            comid = item.comid,
                branchid = item.branchid,
                username = item.username,
                category = item.category,
                description = item.description,
                entrydate = item.entrydate,
                entrytype = "R",
                totalamount = item.totalamount,
                remarks = item.remarks

            Branchcashbook.create({
                comid: parseInt(comid),
                branchid: parseInt(branchid),
                username: username,
                entrydate: entrydate,
                entrytype: entrytype,
                category: category,
                description: description,
                totalamount: parseInt(totalamount),
                remarks: remarks,
                isposted: isposted,
                ispending: ispending,
                iscancel: null
            })
        });

        
        return new NextResponse(JSON.stringify({message:"Fee Voucher Data Successfully Received From SimpliED"},feeData),{status:200});


    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error in Fetching Voucher Data From SimpliED"},feeData),{status:500});

    }
}


export {GET, POST}


///https://www.youtube.com/watch?v=-j7qvs3zKqM



// function sleep(time) {
//     return new Promise((resolve) => {
//       setTimeout(resolve, time)
//     })
//   }

// await sleep(200)

// await wait(4000)
   