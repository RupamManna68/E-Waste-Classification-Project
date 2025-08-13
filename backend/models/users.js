// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        match: /^[A-Z0-9]{8,20}$/, 
        required: true 
    },
    username: { 
        type: String, 
        minlength: 3, 
        maxlength: 50, 
        required: true 
    },
    email: { 
        type: String, 
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        required: true 
    },
    passwordHash: { type: String, required: true },
    fullName: { type: String, maxlength: 100, required: true },
    employeeId: { type: String },
    role: { 
        type: String, 
        enum: [
            "COORDINATOR", "STORAGE_STAFF", "ADMIN", "AUDITOR", 
            "VENDOR_USER", "RECYCLER_USER", "SUPER_ADMIN"
        ],
        required: true
    },
    orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
    deptId: { type: mongoose.Schema.Types.ObjectId },
    profile: {
        phone: String,
        alternatePhone: String,
        designation: String,
        qualification: String,
        experience: Number,
        specializations: [String],
        profilePicture: String, // GridFS file ID
        bio: { type: String, maxlength: 500 }
    },
    permissions: {
        modules: [String],
        actions: [String],
        dataAccess: [String],
        customPermissions: { type: Object }
    },
    preferences: {
        language: { type: String, default: "en" },
        timezone: { type: String, default: "Asia/Kolkata" },
        theme: { type: String, default: "light" },
        notifications: {
            email: { type: Boolean, default: true },
            sms: { type: Boolean, default: false },
            push: { type: Boolean, default: true },
            frequency: { type: String, enum: ["IMMEDIATE", "DAILY", "WEEKLY"] }
        }
    },
    security: {
        lastLoginAt: Date,
        lastLoginIP: String,
        failedLoginAttempts: { type: Number, default: 0 },
        accountLockedUntil: Date,
        passwordChangedAt: Date,
        twoFactorEnabled: { type: Boolean, default: false },
        twoFactorSecret: String,
        activeSessions: { type: Array }
    },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
