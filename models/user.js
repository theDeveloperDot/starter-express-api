import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: { type: String },
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
    phone: {
        type: Number,
        minlength: [10, "Please enter a vlid phone number"],
        unique: true
    },
    avatar: {
        access_id: { type: String },
        secure_url: { type: String }
    },
    address: [{
        _id: false,
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: Number }
    }],
    invite_type: {
        type: String,
        enum: ["default", "referal", "email", "phone", "google"],
        default: "default"
    },
    inviter_id: { type: mongoose.Types.ObjectId,ref:"users"  },
    invites: [{
        invitee_id: { type: mongoose.Types.ObjectId,ref:"users"  },
        created_at: { type: Date, default: Date.now },
        activated_at: { type: Date, default: Date.now },
    }],
    referral_id: { type: String, required: true },
    cashback_balance: { type: Number, default: 0 },
    total_earning: { type: Number, default: 0 },
    ready_to_withdrow: { type: Number, default: 0 },
    giftcards: [{ type: mongoose.Types.ObjectId,ref:"giftcards"  }],
    coupons: [{ type: mongoose.Types.ObjectId,ref:"coupons" }],
    total_withdrows: [{
        amount: { type: Number },
        withdrow_at: { type: Date, default: Date.now }
    }],
}, { timestamps: true })


// Encrypting password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);

})

// Compare User Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword+"", this.password)
}

// Return JWT TOken
userSchema.methods.getJwtToken = function () {
    return Jwt.sign({email:this.email, id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;

}
export const User = mongoose.model("user", userSchema)