import { connectMongoDB } from "@/dblib/dbmongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/model/user";

export async function PUT(request) {
  try {

    const body = await request.json();

    await connectMongoDB();

    console.log(body.userid, '---PUT---', body.action);

    const userid = body.userid;

    const ObjectId = require('mongodb').ObjectId;
    await connectMongoDB();

    let query = { _id: new ObjectId(userid) };

    body.action == "InActive" ?
      await User.findByIdAndUpdate(query, { isactive: 'true' })
      :
      await User.findByIdAndUpdate(query, { isactive: 'false' })


    return NextResponse.json({ message: "User Record Has Been Updated" }, { status: 200 });


    //   const db = mongoose.connection;

    //   const userlist_aggregate = [
    //       {
    //         $lookup: {
    //           from: "branchlists",
    //           localField: "branchid",
    //           foreignField: "id",
    //           as: "lookup"
    //         }
    //       },
    //       {
    //         $unwind: {
    //           path: "$lookup"
    //         }
    //       },
    //       {
    //         $project: {
    //           _id: 1,
    //           name: 1,
    //           email: 1,
    //           isactive: 1,
    //           userrole: 1,
    //           usertype: 1,
    //           branchname: "$lookup.branchname"
    //         }
    //       }
    //     ]

    //   let userlist=[];  

    //   //userlist = await db.collection('userslist').find().toArray()

    //   userlist = await db.collection('users').aggregate(userlist_aggregate).toArray()

    //  return NextResponse.json(userlist);        


  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error' + error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}


export async function DELETE(request) {
  try {

    const body = await request.json();

    await connectMongoDB();

   // console.log(body.userid, '---DELETE---', body.action);

    const userid = body.userid;

    const ObjectId = require('mongodb').ObjectId;
    await connectMongoDB();

    let query = { _id: new ObjectId(userid) };

    await User.findByIdAndDelete(query);

    return NextResponse.json({ message: "User Has Been Deleted..." }, { status: 200 });

    // const data = await User.find();

    // return NextResponse.json(data, { message: "User Has Been Deleted..." }, { status: 200 });


  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error' + error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}