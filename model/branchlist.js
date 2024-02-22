import mongoose, { Schema, models } from "mongoose";

const branchSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: [true, "Must be unique."]
        },
        branchname: {
            type: String,
            required: true,
            unique: [true, "Must be unique."]
        },
        comid: {
            type: String,
            required: true,
        },      
        branchemail: {
            type: String,
            required: true,
            unique: [true, "Must be unique."]
        }          
    } 
);

const Branchlist = models.branchlist || mongoose.model("branchlist", branchSchema);

export default Branchlist;
