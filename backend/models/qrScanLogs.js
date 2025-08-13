// QR SCAN LOGS SCHEMA
// ================================================================
const mongoose = require('mongoose');
const qrScanLogSchema = new mongoose.Schema({
  qrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QrCode',
    required: true
  },
  itemId: {
    type: String,
    required: true,
    ref: 'EwasteItem'
  },
  
  // Scanner details
  scannedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  scannerType: {
    type: String,
    enum: ['coordinator', 'storage_staff', 'vendor', 'recycler', 'auditor'],
    required: true
  },
  deviceInfo: String,
  
  // Location and time
  scanTimestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  gpsLocation: {
    latitude: Number,
    longitude: Number
  },
  locationDescription: String,
  
  // Context
  scanPurpose: {
    type: String,
    enum: ['intake', 'storage', 'pickup', 'transit', 'delivery', 'processing', 'audit'],
    required: true,
    index: true
  },
  batchId: String,
  lotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuctionLot'
  },
  
  // Verification
  verificationStatus: {
    type: String,
    enum: ['valid', 'invalid', 'suspicious'],
    default: 'valid',
    index: true
  },
  verificationNotes: String,
  
  // Additional context
  temperature: Number, // Environmental conditions if relevant
  humidity: Number,
  photoUrl: String // Photo taken during scan if needed
}, {
  timestamps: false, // Using custom scanTimestamp
  collection: 'qrScanLogs'
});