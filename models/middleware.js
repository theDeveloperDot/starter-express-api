import mongoose from "mongoose";

const middlewareSchema = new mongoose.Schema({
    name: { type: String },
    admin: { type: mongoose.Types.ObjectId, ref: "admins", required: true },
    features: [{ type: String }],
    active: { type: Boolean, default: true }
}, { timestamps: true })

export const Middleware = mongoose.model('middleware', middlewareSchema)