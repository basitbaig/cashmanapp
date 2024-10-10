import { connectMongoDB } from "@/dblib/dbmongo";
import Financecashbook from "@/model/hofincash";
import Branchcashbook from "@/model/branchcash";
import { NextResponse, NextRequest } from "next/server";
 

export async function PUT(request) {

  try
  {

  
    const body = await request.json();
 
    const transid = body.transid;
     

    const ObjectId = require('mongodb').ObjectId;
    
    await connectMongoDB();

    let query = {_id: new ObjectId(transid)};

    { body.branchid==19 ?
        await Financecashbook.findByIdAndUpdate(query, { iscancel: 'true' })
      :
        await Branchcashbook.findByIdAndUpdate(query, { iscancel: 'true' })
     }
   
    return NextResponse.json({message: "Transaction Cancelled Succesfully..."}, {status: 200});
  }
  catch (error) {
    return new NextResponse("Error " + error.message, {status:500});
  }

}
  