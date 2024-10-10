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

        if (typeof body.report === "undefined") {
            branchdata = await (body.branchid == 19 ? Financecashbook : Branchcashbook).find({
                branchid: body.branchid,
                iscancel: null,
                isreject: false,
                $expr: {
                    $eq: [
                        { $dateToString: { date: "$entrydate", format: "%Y-%m-%d" } },
                        { $dateToString: { date: new Date(), format: "%Y-%m-%d" } }
                    ]
                }
            }).select("_id entrydate entrytype category description totalamount remarks ispending iscancel isposted").sort({ _id: -1 });
        } else {
            const query = {
                branchid: body.branchid,
                ispending: false,
                isreject: false,
                iscancel: null,
            };

            if (body.feehead && body.feehead !== "undefined" && body.feehead !== "") {
                query.category = body.feehead;
            }

            branchdata = await (body.branchid == 19 ? Financecashbook : Branchcashbook).find(query)
                .select("_id entrydate entrytype category description totalamount remarks ispending iscancel isposted isreject")
                .sort({ _id: -1 });
        }

        return NextResponse.json(branchdata);

    } catch (error) {
        //console.error(error);
        return new NextResponse("Error " + error.message, {status:500});
    }
}


 