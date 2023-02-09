import asyncHandler from 'express-async-handler'
import { StoreLog } from '../models/stores/log.js';
import { Store } from '../models/stores/store.js';

// create new store
const createStore = asyncHandler(async (req, res) => {
    const newStoreData = req.body;
    newStoreData.add_by = req.admin._id
    const store = await Store.create(newStoreData)
    const logData = {
        update_by: req.admin._id,
        store_id: store._id,
        updated_content: `${req.admin.name} has established a new store named ${store.name}.`
    }
    StoreLog.create(logData)
    res.status(200).json({
        success: true,
        store
    })
})

// get single store 
const getStore = asyncHandler(async (req, res) => {
    const { storeId } = req.params;
    const store = await Store.findById(storeId)
    if (!store) {
        return res.status(404).json({ success: false, error: "Store not found" })
    }
    res.status(200).json({
        success: true,
        store
    })
})

// get admin based stores

const getAdminBasedStores = asyncHandler(async (req, res) => {
    const { adminId } = req.params;
    const stores = await Store.find({ add_by: adminId })
    res.status(200).json({ success: true, stores })
})

// get all stores 
const getAllStores = asyncHandler(async (req, res) => {
    const stores = await Store.find()
    if (!stores) {
        return res.status(404).json({ success: false, error: "Store not found" })
    }
    res.status(200).json({
        success: true,
        stores
    })
})

export { createStore, getStore, getAllStores, getAdminBasedStores }