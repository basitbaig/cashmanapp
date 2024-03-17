import { connectMongoDB } from "@/dblib/mongodb";
import Branchlist from "@/model/branchlist";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose"
export async function POST(request) {
   
    try {
   
        const { branchid,branchname,company,branchemail } = await request.json();
 
        await connectMongoDB();

        const query = { id: branchid };
 
        const res = await Branchlist.findOneAndUpdate(query, { $set: { branchname: branchname, branchemail: branchemail } }, {new: true})
        
        if (!res)
        {
            await Branchlist.create({ 
                id:branchid, 
                branchname:branchname,
                comid:company,
                branchemail:branchemail             
            });

            return NextResponse.json({message: "New Branch Created"},{status: 201});
        }
        
 
        return NextResponse.json({message: "Branch Updated"},{status: 201});
        
    } catch (error) {       
        return  NextResponse.json({message: "Error In Branch Creation"},{status: 500});     
    }
}