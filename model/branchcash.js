import mongoose, { Schema, models } from "mongoose";

 
const branchcashSchema = new mongoose.Schema(
    {
        comid: {type: Number},
        branchid: {type: Number},
        username: {type: String},
        entrydate: {type: Date},
        entrytype: {type: String},
        issuetobranch:{type: Number},
        recevfrombranch:{type: Number},
        category:{type: String},
        description: {type: String},
        totalamount: {type: Number},
        remarks: {type: String},
        ispending: {type: Boolean, default: true},
        isreject: {type: Boolean, default: false},        
        isposted: {type: Boolean, default: false},
        iscancel: {type: Boolean, default: null}       
    },
    {
        timestamps: true,
    }
)

const Branchcashbook = models.Branchcashbook || mongoose.model("Branchcashbook", branchcashSchema);
export default Branchcashbook;

 