import { connectMongoDB } from "@/dblib/dbmongo";
import User from "@/model/user";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {

    try {

        const { email, password } = await request.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();

        const query = { email: email };

        console.log(email);

        const res = await User.findOneAndUpdate(query, { $set: { password: hashedPassword, firstlogin: 'false' } }, {new: true})
         
 
        return NextResponse.json({ message: "Password Updated" }, { status: 201 });
        
    } catch (error) {
        return NextResponse.json({ message: "Error In Password Update" }, { status: 500 });
    }
}