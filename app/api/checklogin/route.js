import { connectMongoDB } from "@/dblib/dbmongo";
import User from "@/model/user";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await connectMongoDB();
        const { email,password } = await request.json();

        const user = await User.findOne({ email, isactive: true });

        if (!user) {
            return NextResponse.json({"Error":"Invalid Email / User Is not Authorized to Login"});
        }

  
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return NextResponse.json({"Error":"Invalid Password"});
        }
        
        return NextResponse.json({user});

    } catch (error) {        
        console.log(error);
        return new NextResponse("Error in getting user" + error.message, {status:500});
    }
}