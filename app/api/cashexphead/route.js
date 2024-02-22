import { connectMongoDB } from "@/dblib/mongodb";
import CashExphead from "@/model/cashexphead";
import { NextResponse, NextRequest } from "next/server";
 
export async function POST(request) {
   
    try {
   
        const { username,exphead, headtype } = await request.json();
 
        await connectMongoDB();
 
        await CashExphead.create({ 
            cashexphead:exphead, 
            headtype:headtype,
            createby:username 
        });
 
        return NextResponse.json({message: "New Cash/Expense Head Created"},{status: 201});
        
    } catch (error) {
        
        return  NextResponse.json({message: "Error In Cash/Expense Head"},{status: 500});     
    }
}