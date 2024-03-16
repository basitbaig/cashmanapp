import { Schema, model, models } from "mongoose"

const PostedVoucherSchema = new Schema({
    comid: {type: Number, required: true},
    branchid: {type: Number, required: true},
    feebillid: {type: String, required: true},
    rollno:{type: String, required: true},
    studentname:{type: String, required: true},
    feemonths: {type: String, required: true},
    challanid: {type: Number, required: true},
    totalamount: {type: Number, required: true},
    receivedate: {type: Date, required: true},
    description:{type: String},
    isposted: {type: Boolean, default: false},
    islock: {type: Boolean, default: false}
});

const PostedVoucher = models.PostedVoucher || model("PostedVoucher", PostedVoucherSchema);

export default PostedVoucher;