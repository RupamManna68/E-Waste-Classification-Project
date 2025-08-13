// CERTIFICATES SCHEMA
// ================================================================
const mongoose = require('mongoose');
const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  certificateType: {
    type: String,
    enum: ['recycling', 'data_destruction', 'refurbishment', 'hazardous_disposal'],
    required: true,
    index: true
  },
  issuedTo: {
    type: String,
    required: true
  },
  issuedBy: {
    type: String,
    required: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor'
  },
  recyclerCpcbRegNo: {
    type: String,
    required: true
  },
  cpcbRegExpiry: Date,
  
  // Item/Batch references
  batchId: String,
  lotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuctionLot'
  },
  itemsProcessed: [{
    itemId: {
      type: String,
      ref: 'EwasteItem'
    },
    serialNumber: String,
    weight: Number
  }],
  
  // Processing details
  dateOfProcessing: {
    type: Date,
    required: true,
    index: true
  },
  incomingWeightKg: Number,
  processingSummary: {
    metal: { type: Number, default: 0 },
    plastic: { type: Number, default: 0 },
    glass: { type: Number, default: 0 },
    battery: { type: Number, default: 0 },
    pcb: { type: Number, default: 0 },
    hazardous: { type: Number, default: 0 },
    refurbishedCount: { type: Number, default: 0 }
  },
  processingMethods: String,
  
  // Certificate metadata
  certificatePdfUrl: String,
  digitalSignatureHash: String,
  authorizedSignatory: {
    type: String,
    required: true
  },
  signatoryDesignation: String,
  
  // Status and validation
  validationStatus: {
    type: String,
    enum: ['pending', 'validated', 'rejected', 'revision_required'],
    default: 'pending',
    index: true
  },
  validationNotes: String,
  validatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  validatedAt: Date,
  
  co2SavedKg: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true,
  collection: 'certificates'
});