import mongoose from "mongoose";

const storeSubSategorySchema = new mongoose.Schema({
    add_by: { type: mongoose.Schema.ObjectId, ref: 'admins' },
    name: { type: String }
}, { timestamps: true })

export const StoreSubCategory = mongoose.model('storesubcategory', storeSubSategorySchema)