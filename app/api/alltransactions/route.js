import { connectMongoDB } from "@/dblib/dbmongo";
import Branchcashbook from "@/model/branchcash";
import Financecashbook from "@/model/hofincash";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose"

export const dynamic ='force-dynamic';
export async function POST(request) {
    try {
        const body = await request.json();
        await connectMongoDB();

        let branchdata;
        
        const query = {
            branchid: body.branchid
        };

        console.error(query);

        branchdata = await (body.branchid == 19 ? Financecashbook : Branchcashbook).find(query)
        .select("_id entrydate entrytype category description totalamount remarks ispending iscancel isposted isreject")
        .sort({ _id: -1 });

        return NextResponse.json(branchdata);

    } catch (error) {
        
        return new NextResponse("Error " + error.message, {status:500});
    }
}


 