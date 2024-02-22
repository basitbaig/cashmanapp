import { connectMongoDB } from "@/dblib/mongodb";
import User from "@/model/user";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
   
    try {
          
        //const userdata = await req.json();
        
        const active = Boolean(1);
        const newuser = Boolean(1);

        const { email, name, password, ubranchid, ucomid, urole, utype} = await request.json();
        //const {comid, branchid, username, useremail, upassword, userrole, usertype } = await req.json();

        const hashedPassword = await bcrypt.hash(password,10);
        
        //const fs = require('fs');
        //fs.writeFile('user.json',JSON.stringify(userdata), finished);
         await connectMongoDB();

        await User.create({ name:name, email:email, password:hashedPassword, comid:ucomid, branchid:ubranchid, isactive:active.toString(), firstlogin:newuser.toString(), userrole:urole, usertype:utype})
        

        return NextResponse.json({message: "User Registerd"},{status: 201});
    } catch (error) {
        return  NextResponse.json({message: "Error In User Registration"},{status: 500});     
    }
}