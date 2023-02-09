import mongoose from "mongoose";

const categoryLogSchema = new mongoose.Schema({
    update_by: { type: mongoose.Schema.ObjectId, ref: 'admins',required:true },
    store_id: { type: mongoose.Schema.ObjectId, ref: 'stores' },
    old_content: { type: String },
    updated_content: { type: String ,required:true},
}, { timestamps: true })

export const CategoryLog = mongoose.model('categorylog', categoryLogSchema)