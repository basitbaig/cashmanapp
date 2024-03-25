import { connectMongoDB } from "@/dblib/mongodb";
import FeeVoucher from "@/model/feevoucher";
import Branchcashbook from "@/model/branchcash";
import { NextResponse, NextRequest } from "next/server";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

export async function GET() {
    // const response = await fetch('https://jsonplaceholder.typicode.com/users');
    // const parsedData = await response.json();
    await connectMongoDB();
    const parsedData = await FeeVoucher.find({islock: true, isposted: false});

    return Response.json(parsedData)
}

export async function POST(request) {
    try {
        const feerecord = await request.json();

        await connectMongoDB();
        const feeData = new FeeVoucher(feerecord);
        await feeData.save();

        await FeeVoucher.updateMany({islock: false, isposted: false},  {islock: true });

        let currentDate=new Date();

        let ispending = Boolean(0);
        let isposted = Boolean(1);

        let comid, branchid, username,entrydate,entrytype,category,description,totalamount,remarks;
        
        const newFeeData=await FeeVoucher.find({islock: true, isposted: false })
      
        newFeeData.map((item) => {
            Branchcashbook.create({
            comid: parseInt(item.comid),
            branchid: parseInt(item.branchid),
            username: "Branch User",
            category: "School Fee Collection",
            entrydate: item.receivedate,
            entrytype: "R",
            description: item.feebillid + "-" + item.rollno + "-" + item.studentname + "-" + item.feemonths + "-" + item.challanid,
            totalamount: parseInt(item.totalamount),
            remarks: item.description,
            isposted: isposted,
            ispending: ispending,
            iscancel: null
        })
    });         

    const filter = { isposted: false, islock: true }
    await FeeVoucher.updateMany(filter,  {isposted: true });

    return new Response(JSON.stringify({message:"Fee Voucher Data Successfully Received From SimpliED"},
                {newFeeData}),{
                    headers: { 
                        "Content-Type":"application/json",
                    }, 
                    status: 201,
                });        
    // return new NextResponse(JSON.stringify({message:"Fee Voucher Data Successfully Received From SimpliED"},{newFeeData}),{headers: { "Content-Type":"application/json",}, status: 201,});
    } catch (error) {
     return Response.json({newFeeData})
      
       return new NextResponse(JSON.stringify({message:"Error in Fetching Voucher Data From SimpliED"},{newFeeData}),{status:500});

    }
}


//export {GET, POST}


///https://www.youtube.com/watch?v=-j7qvs3zKqM



// function sleep(time) {
//     return new Promise((resolve) => {
//       setTimeout(resolve, time)
//     })
//   }

// await sleep(200)

// await wait(4000)
   

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


        // model.find({
        //     '_id': { $in: [
        //         mongoose.Types.ObjectId('4ed3ede8844f0f351100000c'),
        //         mongoose.Types.ObjectId('4ed3f117a844e0471100000d'), 
        //         mongoose.Types.ObjectId('4ed3f18132f50c491100000e')
        //     ]}
        // }, function(err, docs){
        //      console.log(docs);
        // });