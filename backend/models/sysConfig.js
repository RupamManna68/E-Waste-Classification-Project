// ================================================================
// SYSTEM CONFIGURATION SCHEMA
// ================================================================
const mongoose = require('mongoose');
const systemConfigSchema = new mongoose.Schema({
  configKey: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  configValue: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  description: String,
  category: {
    type: String,
    enum: ['policy', 'integration', 'notification', 'processing', 'compliance'],
    required: true,
    index: true
  },
  
  // Data type for validation
  dataType: {
    type: String,
    enum: ['string', 'number', 'boolean', 'object', 'array'],
    required: true
  },
  
  // Version control
  version: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  
  // Access control
  requiresAdminApproval: {
    type: Boolean,
    default: true
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Validation rules
  validationRules: {
    minValue: Number,
    maxValue: Number,
    allowedValues: [String],
    regex: String
  },
  
  // Environment specific
  environment: {
    type: String,
    enum: ['development', 'staging', 'production'],
    default: 'production'
  }
}, {
  timestamps: true,
  collection: 'systemConfig'
});