import asyncHandler from "express-async-handler";
import { StoreCategory } from "../models/categories/storeCategory.js";

// store category section

// create new category
const createStoreCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const categoryData = {
        name,
        added_by: req.admin._id,
        expiry_date: new Date()
    }
    const category = await StoreCategory.create(categoryData)
    res.status(200).json({
        success: true,
        category
    })
})

// update category name
const updateCateGoryName = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body.name;
    let category = await StoreCategory.findById(categoryId)
    if (!category) {
        return res.status(401).json({ success: false, message: "category not found" })
    }
    category = await StoreCategory.updateOne({ _id: categoryId }, { $set: { name: name } })
    res.status(200).json({ success: true, category })
})

// add one or multiple subcategory 
const addSubcategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { subCatIds } = req.body;
    let category = await StoreCategory.findById(categoryId)
    if (!category) {
        return res.status(401).json({ success: false, message: "category not found" })
    }
    category = await StoreCategory.updateOne(
        { _id: categoryId },
        { $push: { sub_category: { $each: subCatIds } } }
    )
    res.status(200).json({ success: true, category })
})

// remove one or multiple subcategory
const removeSubcategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { subCatIds } = req.body;
    let category = await StoreCategory.findById(categoryId)
    if (!category) {
        return res.status(401).json({ success: false, message: "category not found" })
    }
    category = await StoreCategory.updateOne(
        { _id: categoryId },
        { $pull: { sub_category: { $in: subCatIds } } }
    )
    res.status(200).json({ success: true, category })
})

// delete one or multiple categories
const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    let category = await StoreCategory.findById(categoryId)
    if (!category) {
        return res.status(401).json({ success: false, message: "category not found" })
    }
    category = await StoreCategory.updateOne(
        { _id: { $in: categoryId } },
        { $set: { delete: true } })
    res.status(200).json({ success: true, category })
})

// restore  one or multiple categories
const restoreCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    let category = await StoreCategory.findById(categoryId)
    if (!category) {
        return res.status(401).json({ success: false, message: "category not found" })
    }
    category = await StoreCategory.updateOne(
        { _id: { $in: categoryId } },
        { $set: { delete: false } })
    res.status(200).json({ success: true, category })
})

// store category section



export { createStoreCategory, updateCateGoryName, addSubcategory, removeSubcategory, deleteCategory, restoreCategory }