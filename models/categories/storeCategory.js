import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    affiliation: { type: Number },
    section_name: { type: String },
    section_cashback: { type: String },
    new_user_cb: { type: String },
    getting_new_user_rate: { type: String },
    section_link: { type: String },
    coupon_code: { type: String },
    type: { type: Number },
    device: { type: Number },
    weekly_image: { type: String },
    added_by: { type: mongoose.Types.ObjectId, ref: 'admins', required: true },
    expiry_date: { type: Date, required: true },
    notes: { type: String },
    sub_category: [{ type: mongoose.Types.ObjectId, ref: 'storesubcategory' }],
    delete: { type: Boolean, default: false }
}, { timestamps: true })

export const StoreCategory = mongoose.model('storecategory', categorySchema)