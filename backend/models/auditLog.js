// ================================================================
// AUDIT LOGS SCHEMA
// ================================================================
const mongoose = require('mongoose');
const auditLogSchema = new mongoose.Schema({
  // Actor information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userEmail: String,
  userRole: String,
  
  // Action details
  actionType: {
    type: String,
    required: true,
    index: true
  }, // 'CREATE', 'UPDATE', 'DELETE', 'SCAN', 'APPROVE', etc.
  entityType: {
    type: String,
    required: true,
    index: true
  }, // 'ewaste_item', 'certificate', 'vendor', etc.
  entityId: {
    type: String,
    required: true,
    index: true
  },
  
  // Context
  oldValues: mongoose.Schema.Types.Mixed,
  newValues: mongoose.Schema.Types.Mixed,
  ipAddress: String,
  userAgent: String,
  sessionId: String,
  
  // Location/device context
  gpsLocation: {
    latitude: Number,
    longitude: Number
  },
  deviceInfo: String,
  
  // Additional metadata
  notes: String,
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'low',
    index: true
  },
  
  // Compliance flags
  isComplianceRelevant: { type: Boolean, default: false },
  retentionPeriodYears: { type: Number, default: 7 },
  
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: false, // Using custom timestamp field
  collection: 'auditLogs'
});