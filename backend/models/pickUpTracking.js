// models/pickupItemTracking.model.js
const mongoose = require('mongoose');

const pickupItemTrackingSchema = new mongoose.Schema({
  pickupOrderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true },

  // Scanning & Verification
  verification: {
    qrScanTimestamp: { type: Date },
    manualEntryTimestamp: { type: Date },
    scannedByVendorUser: { type: String },
    verifiedByCollegeUser: { type: mongoose.Schema.Types.ObjectId },
    scanLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number] // [longitude, latitude]
      }
    },
    locationAccuracyMeters: { type: Number }
  },

  // Physical Condition Assessment
  condition: {
    itemPresent: { type: Boolean, default: true },
    conditionMatchesRecord: { type: Boolean, default: true },
    individualWeightKg: { type: Number },
    visibleDamage: { type: Boolean, default: false },
    damageDescription: { type: String },
    additionalFindings: { type: String },
    conditionPhotos: [{ type: mongoose.Schema.Types.ObjectId }] // GridFS IDs
  },

  // Special Handling
  handling: {
    requiresSpecialHandling: { type: Boolean, default: false },
    handlingInstructions: { type: String },
    safetyPrecautionsTaken: { type: String },
    packagingMethod: { type: String },
    loadingSequence: { type: Number },
    vehiclePosition: { type: String }
  },

  // Documentation
  documentation: {
    pickupPhotos: [{ type: mongoose.Schema.Types.ObjectId }], // Before pickup
    loadedPhotos: [{ type: mongoose.Schema.Types.ObjectId }], // After loading
    notes: { type: String, maxlength: 1000 },
    tags: [{ type: String }]
  },

  // Status
  pickupStatus: {
    type: String,
    enum: [
      'PENDING',
      'SCANNED',
      'VERIFIED',
      'LOADED',
      'ISSUE_IDENTIFIED',
      'LEFT_BEHIND'
    ]
  },

  timestamp: { type: Date, default: Date.now }
});

pickupItemTrackingSchema.index({ 'verification.scanLocation': '2dsphere' });

module.exports = mongoose.model('PickupItemTracking', pickupItemTrackingSchema);
