// ================================================================
// REPORTS SCHEMA
// ================================================================
const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
  reportType: {
    type: String,
    enum: ['compliance_annual', 'compliance_monthly', 'department_summary', 
           'vendor_performance', 'material_recovery', 'audit_trail'],
    required: true,
    index: true
  },
  reportTitle: {
    type: String,
    required: true
  },
  reportFormat: {
    type: String,
    enum: ['pdf', 'excel', 'csv', 'json'],
    required: true
  },
  
  // Scope and filters
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  dateFrom: Date,
  dateTo: Date,
  filters: mongoose.Schema.Types.Mixed, // Additional filter criteria
  
  // Generation details
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  generationStatus: {
    type: String,
    enum: ['queued', 'generating', 'completed', 'failed'],
    default: 'queued',
    index: true
  },
  progressPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  // Files
  reportFileUrl: String,
  fileSizeBytes: Number,
  fileHash: String,
  
  // Metadata
  recordCount: Number,
  generationTimeSeconds: Number,
  errorMessage: String,
  
  // Summary statistics (for quick dashboard display)
  reportSummary: {
    totalItems: Number,
    totalWeight: Number,
    totalRecycled: Number,
    totalRefurbished: Number,
    complianceScore: Number
  },
  
  // Access and retention
  isPublic: {
    type: Boolean,
    default: false
  },
  accessList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  expiresAt: Date,
  downloadCount: {
    type: Number,
    default: 0
  },
  
  completedAt: Date,
  
  // Scheduling (for recurring reports)
  isRecurring: { type: Boolean, default: false },
  recurringSchedule: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'quarterly', 'annually']
    },
    dayOfMonth: Number, // For monthly reports
    dayOfWeek: Number,  // For weekly reports
    time: String        // HH:mm format
  }
}, {
  timestamps: true,
  collection: 'reports'
});
