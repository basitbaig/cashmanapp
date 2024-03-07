import { connectMongoDB } from "@/dblib/mongodb";
import Branchcashbook from "@/model/branchcash";
import Financecashbook from "@/model/hofincash";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request) {
    try {
        
        const body = await request.json();

        await connectMongoDB();

        // const mybranch = JSON.parse(branchid);
        let branchdata;

    
        { body.branchid==19 ?
             branchdata = await Financecashbook.find({branchid: body.branchid, iscancel: null}).select("_id entrydate entrytype category description totalamount remarks ispending iscancel").sort({ _id: -1 })
             :
             branchdata = await Branchcashbook.find({branchid: body.branchid, iscancel: null}).select("_id entrydate entrytype category description totalamount remarks ispending iscancel").sort({ _id: -1 })        
        }

     
 
        return NextResponse.json(branchdata);

    } catch (error) {
        console.log(error);
    }
}