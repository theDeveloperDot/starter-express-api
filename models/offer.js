import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    store_id: { type: mongoose.Types.ObjectId, ref: "store",required:true},
    coupon_code: { type: String,  },
    expire_date: { type: Date },
    description: { type: String },
    banner: [{
        access_id: { type: String },
        secure_url: { tpye: String },
        _id: false
    }],
    store_cashback: { type: Number },
    app_cashback: { type: Number },
    minimum_ticket_value: { type: Number },
    // missing: { tpye: mongoose.Types.ObjectId, ref: "store" },
    // created_by: { tpye: mongoose.Types.ObjectId, ref: "admin" },
    disable:{type:Boolean,default:false}
}, { timestamps: true })

export const Offer = mongoose.model("offer", offerSchema)