import mongoose from "mongoose";

const storeLogSchema = new mongoose.Schema({
    update_by: { type: mongoose.Schema.ObjectId, ref: 'admins',required:true },
    store_id: { type: mongoose.Schema.ObjectId, ref: 'stores' },
    offer_id:{ type: mongoose.Schema.ObjectId, ref: 'offers' },
    old_content: { type: String },
    updated_content: { type: String ,required:true},
}, { timestamps: true })

export const StoreLog = mongoose.model('storelog', storeLogSchema)