import { connectMongoDB } from "@/dblib/mongodb";
import { NextResponse } from "next/server";
import User from "@/model/user";

export async function PUT(request) {
    try {
        
        const body = await request.json();
 
        await connectMongoDB();
        const userid = body.userid;

        const ObjectId = require('mongodb').ObjectId;        
        await connectMongoDB();
    
        let query = {_id: new ObjectId(userid)};

        body.action=="Active" ? 
        await User.findByIdAndUpdate(query, { isactive: 'true' }) 
        :
        await User.findByIdAndUpdate(query, { isactive: 'false' })  

        const data = await User.find();

        return NextResponse.json(data, {message: "User Updated Succesfully..."}, {status: 200});
       

    } catch (error) {
        console.log(error);
    }
}


export async function DELETE(request) {
    try {
        
        const body = await request.json();
 
        await connectMongoDB();
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