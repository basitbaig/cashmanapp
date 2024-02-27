import { connectMongoDB } from "@/dblib/mongodb";
import Financecashbook from "@/model/hofincash";
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

         // const { comid, branchid, username,entrydate,entrytype,category,description,totalamount,remarks } = await request.json();
         //transid,username,branchid

         const body = await request.json();

         console.log(body);

         await connectMongoDB();
         const transid = body.transid;

         const ObjectId = require('mongodb').ObjectId;        
         await connectMongoDB();
     
         let query = {_id: new ObjectId(transid)};

        const data = await Branchcashbook.find(query);

        let comid, branchid, username,entrydate,entrytype,category,description,totalamount,remarks;

        data.map((item) => {
            comid=item.comid,
            branchid=item.branchid,
            username=item.username,
            category=item.category,
            description=item.description,
            totalamount=item.totalamount,
            remarks=item.remarks
        });
 
        console.log(comid);
        console.log(username);
        console.log(category);
        console.log(description);
        console.log(totalamount);
        console.log(remarks);
 
        let currentDate=new Date();

        let ispending = Boolean(0);
        let isposted = Boolean(1);
        
        {
         body.branchid == 19 ?
         await Financecashbook.create({ 
             comid:parseInt(comid), 
             branchid:parseInt(body.branchid), 
             username:body.username, 
             entrydate:currentDate.toISOString(), 
             entrytype:"R", 
             issuetobranch:null,
             recevfrombranch:parseInt(branchid),
             brhtransid:transid,
             category:category,
             description:description,
             totalamount:parseInt(totalamount),
             remarks:remarks,
             isposted:isposted,
             ispending:ispending,
             iscancel:null
           }):
           await Branchcashbook.create({ 
               comid:parseInt(body.comid), 
               branchid:parseInt(body.branchid), 
               username:body.username, 
               entrydate:body.entrydate, 
               entrytype:body.entrytype, 
               issuetobranch:null,
               recevfrombranch:null,
               category:body.category,
               description:body.description,
               totalamount:parseInt(body.totalamount),
               remarks:body.remarks,
               isposted:body.isposted,
               ispending:body.ispending,
               iscancel:null
           })
        }
                 
         return NextResponse.json({message: "Amount Received"},{status: 201});

    } catch (error) {
        return  NextResponse.json({message: "Error In Amount Receiving"},{status: 500}); 
    }
}




    //     Branchcashbook.findOneAndUpdate({_id: new ObjectId(userId)}, {
    //         $set: {
    //             ispending: false
    //         } 
    //    }, {new:true}).then((updatedUser:UserModel) => {
    //         console.log(updatedUser.profileUrl)
    //    })

        