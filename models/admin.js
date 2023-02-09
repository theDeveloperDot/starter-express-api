import mongoose from "mongoose";
import validator from "validator";
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import  Jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Your password must be longer than 8 characters"],
        select: false
    },
    role: { 
        type: String, 
        default: 'offer creator' 
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    block:{
        type:Boolean,
        default:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

// Encrypting password before saving user
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);

})

// Compare User Password
adminSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword+"", this.password)
}

// Return JWT TOken
adminSchema.methods.getJwtToken = function () {
    return Jwt.sign({email:this.email, id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generate Password Reset Token
adminSchema.methods.getResetPasswordToken = function () {
    // Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;

}

export const Admin = mongoose.model("admins", adminSchema);