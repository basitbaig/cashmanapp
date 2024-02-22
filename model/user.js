import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, "Must provide a valid email."],
            unique: [true, "Must be unique."]
        },
        password: {
            type: String,
            required: true,
        },
        comid: {
            type: Number,
        },
        branchid: {
            type: Number,
            required: true,
        },        
        isactive: {
            type: Boolean,   
            default: false     
        },          
        firstlogin: {
            type: Boolean,   
            default: true     
        },         
        usertype: {
            type: String,
            required: true,
        },
        userrole: {
            type: String,
            default: 'User',
            required: true,
        }              
    },
    { timestamps: true}
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
