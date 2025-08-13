// models/Organization.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: { type: String },
  area: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: {
    type: String,
    match: /^[0-9]{6}$/,
    required: true
  },
  country: { type: String, default: "India" }
});

const organizationSchema = new mongoose.Schema({
  orgCode: {
    type: String,
    required: true,
    match: /^[A-Z0-9]{2,10}$/
  },
  orgName: {
    type: String,
    required: true,
    maxlength: 150
  },
  orgType: {
    type: String,
    enum: ["COLLEGE", "UNIVERSITY", "INSTITUTE", "CORPORATE"],
    required: true,
    default: "COLLEGE"
  },
  address: { type: addressSchema, required: true },
  contactEmail: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  contactPhone: {
    type: String,
    match: /^[+]?[0-9]{10,15}$/
  },
  website: { type: String },
  spcbRegistration: { type: String },
  establishedYear: { type: Number },
  affiliations: [{ type: String }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Optional: Auto-update updatedAt before save
organizationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Organization", organizationSchema);
