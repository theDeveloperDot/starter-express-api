import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    store_logo: { access_id: { type: String }, secure_url: { type: String } },
    banners: [{ access_id: { type: String }, secure_url: { type: String }, _id: false }],
    offer_warning: { type: String },
    categories: [{
        category: { type: mongoose.Schema.ObjectId, ref: 'categorys' },
        sub_categories: [{ type: mongoose.Schema.ObjectId, ref: 'storesubcategorys' }],
        _id: false
    }],
    affiliate_link: { type: String },
    affiliation: { type: Number },
    campaign_type: { type: String },
    store_offer: { type: String },
    related_stores: [{ type: mongoose.Schema.ObjectId, ref: 'stores' }],
    minimum_amount: { type: Number },
    maximum_amount: { type: Number },
    store_desc: { type: String },
    detailed_desc: { type: String },
    reliability: { type: Number },
    is_trackable: { type: Number },
    priority: { type: Number },
    auto_check: { type: Number },
    home_offer: { type: Number },
    is_special: { type: Number },
    store_warning: { type: String },
    store_top_warning: { type: String },
    top_warning_link: { type: String },
    top_warning_show_inactive: { type: String },
    warning_type: { type: Number },
    store_howtoget: { type: String },
    add_by: { type: mongoose.Schema.ObjectId, ref: 'admins' },

}, { timestamps: true })

export const Store = mongoose.model("stores", storeSchema);