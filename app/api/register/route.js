import { connectMongoDB } from "@/dblib/dbmongo";
import User from "@/model/user";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
   
    try {
 
        const active = Boolean(0);
        const newuser = Boolean(1);

        const { email, name, password, ubranchid, ucomid, urole, utype} = await request.json();
 
        const hashedPassword = await bcrypt.hash(password,10);
 
         await connectMongoDB();

        await User.create({ name:name, email:email, password:hashedPassword, comid:ucomid, branchid:ubranchid, isactive:active.toString(), firstlogin:newuser.toString(), userrole:urole, usertype:utype})
        

        return NextResponse.json({message: "User Registerd"},{status: 201});
    } catch (error) {
        return  NextResponse.json({message: "Error In User Registration"},{status: 500});     
    }
}