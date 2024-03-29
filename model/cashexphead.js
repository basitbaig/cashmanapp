import mongoose, { Schema, models } from "mongoose";

const cashexpheadSchema = new Schema(
    {
        cashexphead: {
            type: String,
            required: true,
            unique: [true, "Must be unique."]
        },
        headtype: {
            type: String,
            required: true,
            enum : ['R','I'],
            default: 'R'
        },
        headmode: {
            type: String,
            required: true,
            enum : ['H','B'],
            default: 'H'
        },        
        createby: {
            type: String
        }      
    },
    { timestamps: true}
);

const CashExphead = models.cashexphead || mongoose.model("cashexphead", cashexpheadSchema);

export default CashExphead;
