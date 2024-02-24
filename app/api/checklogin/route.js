import { connectMongoDB } from "@/dblib/mongodb";
import User from "@/model/user";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await connectMongoDB();
        const { email,password } = await request.json();

        // console.log('---Email and Password At API-----');
        // console.log(email);
        // console.log(password);

        const user = await User.findOne({ email, isactive: true });

        if (!user) {
            return NextResponse.json({"Error":"Invalid Email / Password"});
        }
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return NextResponse.json({"Error":"Invalid Email / Password"});
        }

       
       // const user = await User.findOne({email}).select("name email comid branchid userrole usertype firstlogin");
        return NextResponse.json({user});

    } catch (error) {
        console.log(error);
    }
}