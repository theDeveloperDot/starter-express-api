import asyncHandler from "express-async-handler";
import { Middleware } from "../models/middleware.js";
import {
    ADD_NEW_ADMIN,
    ADD_NEW_CATEGORY,
    ADD_NEW_OFFER,
    ADD_NEW_SUBCATEGORY,
    BLOCK_ADMIN,
    CHANGE_ADMIN_STATUS,
    CREATE_MIDDLEWARE,
    CREATE_STORE,
    DELETE_CATEGORY,
    DELETE_OFFER,
    DELETE_STORE,
    EDIT_OFFER,
    REMOVE_SUNCATEGORY,
    UPDATE_MIDDLEWARE,
    UPDATE_STORE,
    VIEW_ALL_ADMINS,
    VIEW_ALL_MIDDLEWARES,
    VIEW_CATEGORIES,
    VIEW_OFFER,
    VIEW_STORE
} from "../utils/cosntants.js";

// create new middleware
const createMiddleware = asyncHandler(async (req, res) => {
    const { name, access } = req.body;
    const middlewareData = {
        name,
        admin: req.admin._id,
        features: access
    }
    const middleware = await Middleware.create(middlewareData)
    res.status(200).json({ success: true, middleware })
})

// add new one  action or feature to a specific middleware for access
const addFeaturesAccess = asyncHandler(async (req, res) => {
    const { middlewareId } = req.params;
    const { features } = req.body;
    const middleware = await Middleware.findById(middlewareId)
    if (!middleware) {
        return res.status(404).json({ success: false, error:"middleware not found"  })
    }
    await Middleware.updateOne({ _id: middlewareId }, {
        $push: { features: features }
    })

    res.status(200).json({ success: true })
})

// remove existing action feature to a specific middleware for access
const removeFeaturesAccess = asyncHandler(async (req, res) => {
    const { middlewareId } = req.params;
    const { features } = req.body;
    const middleware = await Middleware.findById(middlewareId)
    if (!middleware) {
        return res.status(404).json({ success: false, error:"middleware not found" })
    }
    await Middleware.updateOne({ _id: middlewareId }, {
        $pull: { features: features }
    })

    res.status(200).json({ success: true })
})

// update middleware active status 
const updateMiddlewareStatus = asyncHandler(async (req, res) => {
    const { middlewareId } = req.params;
    const middleware = await Middleware.findById(middlewareId)
    if (!middleware) {
        return res.status(404).json({ success: false,error:"middleware not found"  })
    }
    await Middleware.updateOne({ _id: middlewareId }, {
        $set: { active: !middleware.active }
    })
    res.status(200).json({ success: true })
})

// update middleware name 
const updateName = asyncHandler(async (req, res) => {
    const { middlewareId } = req.params;
    const { name } = req.body;
    const middleware = await Middleware.findById(middlewareId)
    if (!middleware) {
        return res.status(404).json({ success: false,error:"middleware not found" })
    }
    await Middleware.updateOne({ _id: middlewareId }, {
        $set: { name: name }
    })
    res.status(200).json({ success: true })
})

// get all actions for create new middlewares
const getAllActions = asyncHandler(async (req, res) => {

    const access = [VIEW_STORE, CREATE_STORE, UPDATE_STORE, DELETE_STORE,
        VIEW_OFFER, ADD_NEW_OFFER, EDIT_OFFER, DELETE_OFFER, VIEW_CATEGORIES,
        ADD_NEW_CATEGORY, DELETE_CATEGORY, ADD_NEW_SUBCATEGORY, REMOVE_SUNCATEGORY,
        VIEW_ALL_ADMINS, ADD_NEW_ADMIN, CHANGE_ADMIN_STATUS, BLOCK_ADMIN,
        VIEW_ALL_MIDDLEWARES, CREATE_MIDDLEWARE, UPDATE_MIDDLEWARE]

    res.status(200).json({ success: true, access })
})

// get all middlewares
const getAllMiddlewares = asyncHandler(async (req, res) => {
    const middlewares = await Middleware.find()
    res.status(200).json({ success: true, middlewares })
})

export { createMiddleware, addFeaturesAccess, removeFeaturesAccess, updateMiddlewareStatus, updateName, getAllActions, getAllMiddlewares }