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
        description: {type: String},
        totalamount: {type: Number},
        remarks: {type: String},
        ispending: {type: Boolean},
        isposted: {type: Boolean},
        iscancel: {type: Boolean},        
    },
    {
        timestamps: true,
    }
)

const Financecashbook = models.Financecashbook || mongoose.model("Financecashbook", fincashSchema);
export default Financecashbook;

 