// models/vendor.model.js
import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  vendorCode: {
    type: String,
    match: /^VND-[A-Z0-9]{6,15}$/,
    required: true
  },
  companyName: {
    type: String,
    maxlength: 200,
    required: true
  },
  vendorType: {
    type: String,
    enum: ["RECYCLER", "REFURBISHER", "TRANSPORTER", "HYBRID", "AGGREGATOR", "BROKER"],
    required: true
  },
  legalInfo: {
    gstNumber: {
      type: String,
      match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      required: true
    },
    panNumber: {
      type: String,
      match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      required: true
    },
    incorporationNumber: String,
    incorporationDate: Date,
    legalStructure: {
      type: String,
      enum: ["PRIVATE_LIMITED", "PUBLIC_LIMITED", "PARTNERSHIP", "LLP", "PROPRIETORSHIP", "NGO"]
    },
    msmeRegistration: String,
    msmeCategory: {
      type: String,
      enum: ["MICRO", "SMALL", "MEDIUM", "LARGE"]
    }
  },
  compliance: {
    cpcbRegistration: {
      registrationNumber: String,
      registrationDate: Date,
      expiryDate: Date,
      categories: [String],
      isActive: Boolean
    },
    spcbAuthorization: {
      authorizationNumber: String,
      issuingAuthority: String,
      validFrom: Date,
      validUntil: Date
    },
    otherCertifications: [{
      certName: String,
      certNumber: String,
      issuingBody: String,
      validFrom: Date,
      validUntil: Date
    }]
  },
  primaryContact: {
    name: { type: String, maxlength: 100, required: true },
    designation: String,
    email: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: String
  },
  addresses: [{
    type: {
      type: String,
      enum: ["REGISTERED", "OPERATIONAL", "BILLING", "PROCESSING"]
    },
    street: String,
    area: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: "India" },
    isPrimary: { type: Boolean, default: false }
  }],
  businessProfile: {
    establishedYear: Number,
    employeeCount: Number,
    annualTurnover: Number,
    processingCapacity: {
      monthlyCapacityKg: Number,
      categories: [String],
      specializations: [String]
    },
    serviceAreas: [{
      state: String,
      districts: [String],
      cities: [String]
    }]
  },
  financialInfo: {
    bankAccounts: [{
      accountNumber: String,
      accountType: { type: String, enum: ["SAVINGS", "CURRENT", "CC_OD"] },
      bankName: String,
      branchName: String,
      ifscCode: String,
      isPrimary: { type: Boolean, default: false }
    }],
    creditRating: String,
    financialYear: String
  },
  performance: {
    complianceScore: { type: Number, min: 0.0, max: 100.0 },
    performanceRating: { type: Number, min: 0.0, max: 5.0 },
    completedOrders: { type: Number, default: 0 },
    totalValueProcessed: { type: Number, default: 0.0 },
    averageProcessingTime: Number,
    incidentCount: { type: Number, default: 0 },
    certificateDelayCount: { type: Number, default: 0 },
    customerFeedback: [{
      orgId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
      rating: Number,
      comments: String,
      date: Date
    }]
  },
  status: {
    verificationStatus: {
      type: String,
      enum: ["PENDING", "UNDER_REVIEW", "DOCUMENTS_REQUESTED", "VERIFIED", "REJECTED", "SUSPENDED", "BLACKLISTED"]
    },
    onboardingStatus: {
      type: String,
      enum: ["REGISTERED", "PROFILE_COMPLETE", "DOCUMENTS_UPLOADED", "VERIFICATION_PENDING", "APPROVED", "ACTIVE"]
    },
    riskCategory: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
    isActive: { type: Boolean, default: true },
    suspensionReason: String,
    lastActivity: Date
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Auto-update `updatedAt` before save
VendorSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Vendor", VendorSchema);
