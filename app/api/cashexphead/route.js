import { connectMongoDB } from "@/dblib/dbmongo";
import CashExphead from "@/model/cashexphead";
import { NextResponse, NextRequest } from "next/server";
 
export async function POST(request) {
   
    try {
   
        const body = await request.json();
 
        await connectMongoDB();
 
        await CashExphead.create({ 
            cashexphead:body.exphead, 
            headtype:body.headtype,
            headmode:body.headmode,
            createby:body.username 
        });
 
        return NextResponse.json({message: "New Cash/Expense Head Created"},{status: 201});
        
    } catch (error) {
        
        return new NextResponse("Error " + error.message, {status:500});
           
    }
}