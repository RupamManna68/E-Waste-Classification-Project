// models/vendorDocuments.js
import mongoose from "mongoose";

const vendorDocumentsSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, required: true },

    documentCategory: {
      type: String,
      enum: [
        "REGULATORY",
        "FINANCIAL",
        "OPERATIONAL",
        "LEGAL",
        "INSURANCE",
        "CERTIFICATIONS",
      ],
      required: true,
    },

    documentType: {
      type: String,
      enum: [
        "CPCB_CERTIFICATE",
        "SPCB_AUTHORIZATION",
        "GST_CERTIFICATE",
        "PAN_CARD",
        "INCORPORATION_CERTIFICATE",
        "BANK_STATEMENT",
        "ISO_CERTIFICATE",
        "INSURANCE_POLICY",
        "POLLUTION_CLEARANCE",
        "FIRE_NOC",
        "MSME_CERTIFICATE",
        "OTHER",
      ],
      required: true,
    },

    documentDetails: {
      documentName: { type: String },
      documentNumber: { type: String },
      issueDate: { type: Date },
      expiryDate: { type: Date },
      issuingAuthority: { type: String },
      isRecurring: { type: Boolean, default: false },
      renewalPeriodMonths: { type: Number },
    },

    fileInfo: {
      fileName: { type: String, required: true },
      originalFileName: { type: String },
      fileId: { type: mongoose.Schema.Types.ObjectId, required: true }, // GridFS file ID
      fileSize: { type: Number },
      mimeType: { type: String },
      fileHash: { type: String }, // SHA-256 hash
      uploadedAt: { type: Date },
    },

    verification: {
      status: {
        type: String,
        enum: [
          "PENDING",
          "IN_REVIEW",
          "VERIFIED",
          "REJECTED",
          "EXPIRED",
          "RENEWAL_REQUIRED",
        ],
      },
      verifiedBy: { type: mongoose.Schema.Types.ObjectId },
      verifiedAt: { type: Date },
      rejectionReason: { type: String },
      verificationNotes: { type: String },
      nextReviewDate: { type: Date },
    },

    uploadedBy: { type: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export default mongoose.model("VendorDocument", vendorDocumentsSchema);
