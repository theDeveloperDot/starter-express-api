import asyncHandler from 'express-async-handler'
import { Offer } from '../models/offer.js'
import { StoreLog } from '../models/stores/log.js';
import { Store } from '../models/stores/store.js';

// create new offer 
const createOffer = asyncHandler(async (req, res) => {

    const { storeId } = req.params;
    const store = await Store.findById(storeId)
    if (!store) {
        return res.status(404).json({ success: false, error: "store not found" })
    }
    const newOffer = {
        store_id: storeId
    }
    const offer = await Offer.create(newOffer)
    store.offers.push(offer.push)
    store.save();
    const logData = {
        update_by: req.admin._id,
        store_id: offer.store_id,
        offer_id: offer._id,
        updated_content: `${req.admin.name} has added new offer .`
    }
    StoreLog.create(logData)
    res.status(200).json({
        success: true,
        offer
    })
})

// disable and enable offer 
const changeOfferStatus = asyncHandler(async (req, res) => {
    const { offerId } = req.params;
    const offer = await Offer.findById(offerId)
    if (!offer) {
        return res.status(200).json({ success: false, error: "offer not found" })
    }
    Offer.updateOne({ _id: offer._id }, { $set: { disable: !offer.disable } })
    const logData = {
        update_by: req.admin._id,
        store_id: offer.store_id,
        offer_id: offer._id,
        updated_content: `${req.admin.name} has updated offer status .`
    }
    StoreLog.create(logData)

    res.status(200).json({ success: true, message: "Offer status update successful" })
})

// update offer 
const updateOffer = asyncHandler(async (req, res) => {
    const { offerId } = req.params;
    const { coupon_code, expire_date, description, store_cashback,
        app_cashback, minimum_ticket_value } = req.body;

    let offer = await Offer.findById(offerId)

    if (!offer) {
        return res.status(404).json({ success: false, error: "offer not found" })
    }

    offer.coupon_code = coupon_code ? coupon_code : offer.coupon_code;
    offer.expire_date = expire_date ? expire_date : offer.expire_date;
    offer.description = description ? description : offer.description;
    offer.store_cashback = store_cashback ? store_cashback : offer.store_cashback;
    offer.app_cashback = app_cashback ? app_cashback : offer.app_cashback;
    offer.minimum_ticket_value = minimum_ticket_value ? minimum_ticket_value : offer.minimum_ticket_value;
    await offer.save();

    const logData = {
        update_by: req.admin._id,
        store_id: offer.store_id,
        offer_id: offer._id,
        updated_content: `${req.admin.name} has updated an offer .`
    }
    StoreLog.create(logData)

    res.status(200).json({ success: true, offer })

})

// get single offer with offer id
const getSingleOffer = asyncHandler(async (req, res) => {
    const { offerId } = req.params;
    const offer = await Offer.findById(offerId)

    res.status(200).json({ success: true, offer })

})

// get all offers 
const getAllOffers = asyncHandler(async (req, res) => {
    const offers = await Offer.find()

    res.status(200).json({ success: true, offers })
})

export { createOffer, changeOfferStatus, updateOffer, getAllOffers, getSingleOffer }