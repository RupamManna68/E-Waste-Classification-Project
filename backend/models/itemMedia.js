// models/itemMedia.model.js
const mongoose = require("mongoose");

const itemMediaSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    mediaType: {
      type: String,
      enum: ["PHOTO", "VIDEO", "DOCUMENT", "AUDIO", "3D_MODEL"],
      required: true,
    },
    mediaCategory: {
      type: String,
      enum: [
        "FRONT_VIEW", "REAR_VIEW", "SIDE_VIEW", "TOP_VIEW", "BOTTOM_VIEW",
        "ASSET_TAG", "SERIAL_NUMBER", "DAMAGE", "QR_CODE", "BATTERY_COMPARTMENT",
        "PORTS", "SCREEN", "KEYBOARD", "ACCESSORIES", "PACKAGING",
        "CONDITION_ASSESSMENT", "CERTIFICATE", "INVOICE", "WARRANTY", "OTHER"
      ],
      required: true,
    },
    fileInfo: {
      fileName: { type: String, required: true },
      originalFileName: { type: String },
      fileId: { type: mongoose.Schema.Types.ObjectId, required: true }, // GridFS ID
      fileSize: { type: Number, required: true },
      mimeType: { type: String, required: true },
      fileHash: { type: String },
      compressionUsed: { type: Boolean, default: false },
      thumbnailId: { type: mongoose.Schema.Types.ObjectId }
    },
    imageProperties: {
      width: Number,
      height: Number,
      format: String,
      colorSpace: String,
      qualityScore: { type: Number, min: 0.0, max: 1.0 },
      blurScore: Number,
      exposureScore: Number
    },
    metadata: {
      exifData: Object,
      gpsLocation: {
        type: { type: String, enum: ["Point"] },
        coordinates: [Number]
      },
      deviceInfo: {
        make: String,
        model: String,
        software: String
      },
      captureTimestamp: Date,
      lightingConditions: { type: String, enum: ["EXCELLENT", "GOOD", "FAIR", "POOR"] },
      backgroundQuality: { type: String, enum: ["CLEAN", "CLUTTERED", "DISTRACTING"] }
    },
    processing: {
      status: {
        type: String,
        enum: ["UPLOADED", "PROCESSING", "PROCESSED", "FAILED", "ARCHIVED"]
      },
      aiAnalysisCompleted: { type: Boolean, default: false },
      ocrCompleted: { type: Boolean, default: false },
      qualityCheckCompleted: { type: Boolean, default: false },
      processingErrors: [String]
    },
    permissions: {
      visibility: { type: String, enum: ["PRIVATE", "INTERNAL", "VENDOR", "PUBLIC"] },
      downloadAllowed: { type: Boolean, default: true },
      editAllowed: { type: Boolean, default: false }
    },
    isPrimary: { type: Boolean, default: false },
    uploadedBy: mongoose.Schema.Types.ObjectId,
    uploadedAt: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true // Automatically manages createdAt & updatedAt
  }
);

// Geo index for GPS location
itemMediaSchema.index({ "metadata.gpsLocation": "2dsphere" });

module.exports = mongoose.model("ItemMedia", itemMediaSchema);
