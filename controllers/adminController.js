import asyncHandler from 'express-async-handler';
import { Admin } from '../models/admin.js';

// admin login with email and password verification
const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
        return res.status(404).json({
            success: false,
            error: "You are not an admin!"
        })
    }
    const isPasswordMatched = await admin.comparePassword(password);
    if (!isPasswordMatched) {
        res.status(401).json({
            success: false,
            error: "Invalid password"
        })
    }
    const token = await admin.getJwtToken()
    const options = {
        maxAge: 90000*10,
        httpOnly: true,
        signed: true,
    }
    res.cookie("security2", token, options);

    res.status(200).json({
        success: true,
        admin
    })
})

// create new admin with 256 encripted password 
const createAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    const adminData = {
        name, email, password, role
    }
    const admin = await Admin.create(adminData)

    res.status(200).json({
        success: true,
        admin
    })
})

// change role of admin 
const changeAdminRole = asyncHandler(async (req, res) => {
    const { adminId } = req.params;
    const { accessParameter } = req.body;
    let status = accessParameter == 3 ? "super-controll" : accessParameter == 2 ? "semi-controll" : "default"

    await Admin.updateOne({ _id: adminId }, {
        $set: { role: status }
    })
    res.status(200).json({ success: true })
})

// change block status both block and unblock
const changeBlockStatus = asyncHandler(async (req, res) => {
    const { adminId } = req.params;
    const admin = await Admin.findById(adminId)
    if (!admin) {
        return res.status(404).json("admin not found")
    }
    await Admin.updateOne({ _id: adminId }, {
        $set: { block: !admin.block }
    })
    res.status(200).json({
        success: true,
    })

})

// view all admin for super admin
const viewAllAdmins = asyncHandler(async (req, res) => {
    const allAdmins = await Admin.find()
    res.status(200).json({ success: true, allAdmins })
})

// logout admin
const logout = asyncHandler(async(req,res)=>{
    res.status(200).clearCookie("security2").send({});

})

export { adminLogin, createAdmin, changeAdminRole, changeBlockStatus, viewAllAdmins ,logout}