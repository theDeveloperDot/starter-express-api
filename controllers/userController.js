import asyncHandler from 'express-async-handler'
import { User } from '../models/user.js'

// register new user with email and password
const registerUserWithCredentials = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.create({ email, password, invite_type: "email" })

    const token = await user.getJwtToken()
    const options = {
        maxAge: 90000,
        httpOnly: true,
        signed: true,
    }
    res.cookie("security", token, options);

    res.status(200).json({
        success: true,
        user
    })
})

// register new user with google
const regiserUserWithGoogle = asyncHandler(async (req, res) => {
    const { email, password, image } = req.body;
    const userData = {
        email,
        password,
        invite_type: "google",
        avatar: {
            access_id: "",
            secure_url: image
        }
    }

    const user = await User.create(userData)
    if (!user) {
        return res.status(404), json({ success: true, error: 'user not found' })
    }

    const token = await user.getJwtToken()
    const options = {
        maxAge: 90000,
        httpOnly: true,
        signed: true,
    }
    res.cookie("security", token, options);

    res.status(200).json({
        success: true,
        user
    })
})

// login  user with email and password
const loginWithCredentials = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return res.status(404), json({ success: true, error: 'user not found' })
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        res.status(401).json({
            success: false,
            error: "Invalid password"
        })
    }
    const token = await user.getJwtToken()
    const options = {
        maxAge: 90000,
        httpOnly: true,
        signed: true,
    }
    res.cookie("security", token, options);

    res.status(200).json({
        success: true,
        user
    })
})

// login user with google
const loginWithGoogle = asyncHandler(async(req,res)=>{
    // const {email}
})

export { regiserUserWithGoogle, registerUserWithCredentials,loginWithCredentials }