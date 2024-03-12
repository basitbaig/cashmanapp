import { Schema, model, models } from "mongoose"

const FeeVoucherSchema = new Schema({
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
    isposted: {type: Boolean, default: false}
});

const FeeVoucher = models.FeeVoucher || model("FeeVoucher", FeeVoucherSchema);

export default FeeVoucher;