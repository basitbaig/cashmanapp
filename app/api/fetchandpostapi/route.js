// pages/api/fetchAndInsert.js
import axios from 'axios';
import { connectMongoDB } from "@/dblib/dbmongo";
import Apifeedata from "@/model/downloadapi";
import Branchcashbook from "@/model/branchcash";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request, response) {

  try {

    const body = await request.json();

    await connectMongoDB();
 
 
    const newData = [{ 
      pkfeeid:1651176, 
      branchid:1, 
      rollno:25064, 
      feemonth:'SEPTEMBER', 
      challanid:41285053, 
      totalamount:50581, 
      receivedate:'2024-01-16'  
    },
    {
    pkfeeid:1651160, 
    branchid:31, 
    rollno:25060, 
    feemonth:'AUGUST', 
    challanid:41284989, 
    totalamount:79820, 
    receivedate:'2024-01-12'  
    }
  ]
 
    await Apifeedata.insertMany(newData);

    await Branchcashbook.insertMany(Apifeedata.find({isposted: false})).select("branchid");

    return NextResponse.json({ message: "User Registerd" }, { status: 201 });

 
  } catch (error) {
    return NextResponse.json({ message: "Error In User Registration" }, { status: 500 });
  }
}