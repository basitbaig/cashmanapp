import mongoose, { Schema, models } from "mongoose";

const apifeedataSchema = new Schema(
    {
        pkfeeid: {type: Number},
        branchid: {type: Number},
        rollno: {type: Number},
        feemonth: {type: String},
        challanid: {type: Number},
        totalamount: {type: Number},
        receivedate: {type: Date},       
        isposted:{type: Boolean, default: false}   
    },
    { timestamps: true}
);

const Apifeedata = models.Apifeedata || mongoose.model("Apifeedata", apifeedataSchema);
export default Apifeedata;

 