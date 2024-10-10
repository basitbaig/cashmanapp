import { connectMongoDB } from "@/dblib/dbmongo";
import Branchlist from "@/model/branchlist";
import { NextResponse } from "next/server";
import mongoose from "mongoose"
export async function POST(request) {
   
    try {
   
        const body = await request.json();
        //const { branchid,branchname,company,branchemail } = await request.json();
 
        await connectMongoDB();

        const query = { id: parseInt(body.branchid) };
 
        const res = await Branchlist.findOneAndUpdate(query, { $set: { branchname: body.branchname, branchemail: body.branchemail } }, {new: true})
        
        if (!res)
        {
            await Branchlist.create({ 
                id: parseInt(body.branchid), 
                branchname:body.branchname,
                comid:body.company,
                branchemail:body.branchemail             
            });

            return NextResponse.json({message: "New Branch Created"},{status: 201});
        }
        
 
        return NextResponse.json({message: "Branch Updated"},{status: 201});
        
    } catch (error) {       
        return new NextResponse("Error " + error.message, {status:500});   
    }
}