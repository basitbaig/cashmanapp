import { connectMongoDB } from "@/dblib/mongodb";
import User from "@/model/user";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {

    try {

        const { email, password } = await request.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();

        const query = { email: email };

        //console.log(email);

        const res = await User.findOneAndUpdate(query, { $set: { password: hashedPassword, firstlogin: 'false' } }, {new: true})
         
        //console.log(res);
        // await User.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } }, { returnNewDocument: true }, function (err, doc) {
           
        //     if (err) {
        //         console.log("Something wrong when updating data!");
        //     }
            
        //     console.log(doc);
        // });

        return NextResponse.json({ message: "Password Updated" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error In Password Update" }, { status: 500 });
    }
}