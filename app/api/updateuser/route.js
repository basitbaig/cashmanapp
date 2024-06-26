import { connectMongoDB } from "@/dblib/dbmongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/model/user";

export async function PUT(request) {
    try {
        
        const body = await request.json();
 
        await connectMongoDB();

        console.log(body.userid,'---PUT---', body.action);

        const userid = body.userid;

        const ObjectId = require('mongodb').ObjectId;        
        await connectMongoDB();
    
        let query = {_id: new ObjectId(userid)};

        body.action=="InActive" ? 
        await User.findByIdAndUpdate(query, { isactive: 'true' }) 
        :
        await User.findByIdAndUpdate(query, { isactive: 'false' })  

 
        const db = mongoose.connection;

        let userlist=[];  

        userlist = await db.collection('userslist').find().toArray()

       return NextResponse.json(userlist);        
       

    } catch (error) {
        console.log(error);
    }
}


export async function DELETE(request) {
    try {
        
        const body = await request.json();
 
        await connectMongoDB();

        console.log(body.userid,'---DELETE---', body.action);

        const userid = body.userid;

        const ObjectId = require('mongodb').ObjectId;        
        await connectMongoDB();
    
        let query = {_id: new ObjectId(userid)};

        await User.findByIdAndDelete(query);

        const data = await User.find();

        return NextResponse.json(data, {message: "User Deleted Succesfully..."}, {status: 200});
       

    } catch (error) {
        console.log(error);
    }
}