import { connectMongoDB } from "@/dblib/dbmongo";
import User from "@/model/user";
import { NextResponse, NextRequest } from "next/server";

 

export async function POST(request) {
    try {
        await connectMongoDB();
        const { email } = await request.json();
        const user = await User.findOne({email}).select("name email comid branchid userrole usertype firstlogin");
        return NextResponse.json({user});

    } catch (error) {
        return new NextResponse("Error " + error.message, {status:500});
    }
}