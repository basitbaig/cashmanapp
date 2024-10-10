import { connectMongoDB } from "@/dblib/dbmongo";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
 
export const dynamic ='force-dynamic';
export async function GET() {
    try {
        
        await connectMongoDB();
        const db = mongoose.connection;

         let userlist=[];  
         
        const userinfolist = [
            {
              $lookup: {
                from: "branchlists",
                localField: "branchid",
                foreignField: "id",
                as: "lookup"
              }
            },
            {
              $unwind: {
                path: "$lookup"
              }
            },
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
                isactive: 1,
                userrole: 1,
                usertype: 1,
                branchname: "$lookup.branchname"
              }
            }
          ]

          userlist = await db.collection('users').aggregate(userinfolist).toArray();

          //console.log(userlist);
 
         //userlist = await db.collection('userslist').find().toArray()
 
        return NextResponse.json(userlist);

      } catch (error) {
        
        return NextResponse.json({ message: "Error fetching users", error: error.message }, { status: 500 });
      }
}