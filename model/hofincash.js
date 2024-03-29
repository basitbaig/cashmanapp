import mongoose, { Schema, models } from "mongoose";

 
const fincashSchema = new mongoose.Schema(
    {
        comid: {type: Number},
        branchid: {type: Number},
        username: {type: String},
        entrydate: {type: Date},
        entrytype: {type: String},
        issuetobranch:{type: Number},
        recevfrombranch:{type: Number},
        category:{type: String},
        brhtransid: {type: String},
        description: {type: String},
        totalamount: {type: Number},
        remarks: {type: String},
        ispending: {type: Boolean, default: false},
        isreject: {type: Boolean, default: false},          
        isposted: {type: Boolean, default: true},
        iscancel: {type: Boolean, default: null}     
    },
    {
        timestamps: true,
    }
)

const Financecashbook = models.Financecashbook || mongoose.model("Financecashbook", fincashSchema);
export default Financecashbook;

 