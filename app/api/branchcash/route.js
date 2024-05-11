import { connectMongoDB } from "@/dblib/dbmongo";
import Branchcashbook from "@/model/branchcash";
import Financecashbook from "@/model/hofincash";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose"

export async function POST(request) {
    try {
        
        const body = await request.json();

        await connectMongoDB();
 
        let branchdata;
 
        {
            typeof body.report === "undefined" ?           
            body.branchid == 19 ?
                    branchdata = await Financecashbook.find({ branchid: body.branchid, iscancel: null, $expr: {$eq: [{ $dateToString: {date: "$entrydate", format: "%Y-%m-%d"}},{ $dateToString: {date: new Date(), format: "%Y-%m-%d"}}]}}).select("_id entrydate entrytype category description totalamount remarks ispending iscancel isposted").sort({ _id: -1 })
                    :
                    branchdata = await Branchcashbook.find({ branchid: body.branchid, iscancel: null, $expr: {$eq: [{ $dateToString: {date: "$entrydate", format: "%Y-%m-%d"}},{ $dateToString: {date: new Date(), format: "%Y-%m-%d"}}]}}).select("_id entrydate entrytype category description totalamount remarks ispending isreject iscancel isposted").sort({ _id: -1 })          
            :   
            body.branchid == 19 ?               
               body.feehead == "undefined" || body.feehead =="" ?
                    branchdata = await Financecashbook.find({ branchid:body.branchid,ispending:false, iscancel: null }).select("_id entrydate entrytype category description totalamount remarks ispending iscancel isposted").sort({ _id: -1 })
                    :
                    branchdata = await Financecashbook.find({ branchid:body.branchid,ispending:false, category: body.feehead, iscancel: null }).select("_id entrydate entrytype category description totalamount remarks ispending iscancel isposted").sort({ _id: -1 })
                :
                body.feehead == "undefined" || body.feehead =="" ?
                    branchdata = await Branchcashbook.find({ branchid: body.branchid, ispending: false, iscancel: null }).select("_id entrydate entrytype category description totalamount remarks ispending isreject iscancel isposted").sort({ _id: -1 })
                    :
                    branchdata = await Branchcashbook.find({ branchid: body.branchid, ispending: false, category: body.feehead, iscancel: null }).select("_id entrydate entrytype category description totalamount remarks ispending isreject iscancel isposted").sort({ _id: -1 })
        }
        
        return NextResponse.json(branchdata);
 
    } catch (error) {
       
        console.log(error);
    }
}


 