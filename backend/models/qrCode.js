// ================================================================
// QR CODE MANAGEMENT SCHEMA
// ================================================================
const mongoose = require('mongoose');
const qrCodeSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true,
    ref: 'EwasteItem'
  },
  
  // QR Code details
  qrCodeData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  qrImageUrl: String,
  qrHash: {
    type: String,
    unique: true
  },
  
  // Label information
  labelFormat: {
    type: String,
    default: 'thermal_30x30mm'
  },
  labelPrintedAt: Date,
  printedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  printerId: String,
  
  // Status tracking
  status: {
    type: String,
    enum: ['generated', 'printed', 'applied', 'damaged', 'replaced'],
    default: 'generated',
    index: true
  },
  replacementFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QrCode'
  },
  
  // Physical application
  appliedAt: Date,
  appliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  applicationPhotoUrl: String,
  
  // Scanning summary (for quick access)
  lastScannedAt: Date,
  lastScannedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastScanLocation: String,
  totalScanCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  collection: 'qrCodes'
});
