import mongoose from "mongoose";

const giftCardSchema = new mongoose.Schema({
    icb_number: { type: Number, required: true },
    icb_pin: { type: Number, required: true },
    order_date: { type: Date, required: true, default: Date.now },
    status: { type: Number },
    order_id: { type: mongoose.Types.ObjectId, ref: 'orders', required: true },
    redeem_id: { type: String, ref: 'orders', required: true },
    redeem_date: { type: Date, required: true, default: Date.now },
    expiry_date: { type: Date, required: true, default: Date.now },
}, { timestamps: true })

export const GiftCard = mongoose.model('icbgiftcard', giftCardSchema)