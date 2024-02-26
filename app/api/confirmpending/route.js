import { connectMongoDB } from "@/dblib/mongodb";

import Branchcashbook from "@/model/branchcash";
import { NextResponse, NextRequest } from "next/server";



export async function PUT(request) {

    const body = await request.json();
 
    const transid = body.transid;

    const ObjectId = require('mongodb').ObjectId;
    
    await connectMongoDB();

    let query = {_id: new ObjectId(transid)};

    await Branchcashbook.findByIdAndUpdate(query, { ispending: 'false' });


    return NextResponse.json({message: "Transaction Confirm Succesfully..."}, {status: 200});

}

export async function POST(request) {

    try {
        
        const { body } = await request.json();

        const transid = body.transid;

        await connectMongoDB();

        console.log('---Post Pending Query----');

        //const ObjectId = require('mongodb').ObjectId;

        let ObjectId = require('mongoose').Types.ObjectId;

        let query = {_id: new ObjectId(transid)};

        
        console.log(query);

        const res = await Branchcashbook.findOneAndUpdate(query, { $set: { ispending: 'false' } }, {
            returnNewDocument: true
        }, function (error, result) {
                // In this moment, you recive a result object or error

                // ... Your code when have result ... //

                console.log(result);
            });



         
        return NextResponse.json({ message: "Confirm Posting" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Error In Confirm Posting" }, { status: 500 });
    }
}




    //     Branchcashbook.findOneAndUpdate({_id: new ObjectId(userId)}, {
    //         $set: {
    //             ispending: false
    //         } 
    //    }, {new:true}).then((updatedUser:UserModel) => {
    //         console.log(updatedUser.profileUrl)
    //    })

        