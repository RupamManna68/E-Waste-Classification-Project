// ================================================================
// DATA DESTRUCTION CERTIFICATES SCHEMA
// ================================================================
const mongoose = require('mongoose');
const dataDestructionCertificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    ref: 'Certificate'
  },
  itemId: {
    type: String,
    required: true,
    ref: 'EwasteItem'
  },
  deviceSerialNumber: String,
  
  destructionMethod: {
    type: String,
    enum: ['secure_wipe', 'physical_destruction', 'degaussing'],
    required: true
  },
  destructionTool: String,
  destructionStandard: String, // DoD 5220.22-M, NIST 800-88, etc.
  
  operatorName: {
    type: String,
    required: true
  },
  operatorId: String,
  destructionDate: {
    type: Date,
    required: true
  },
  
  // Evidence
  beforeDestructionPhotoUrl: String,
  afterDestructionPhotoUrl: String,
  videoEvidenceUrl: String,
  wipeLogFileUrl: String,
  
  verificationHash: String,
  witnessName: String,
  
  // Compliance details
  complianceStandards: [String],
  auditTrailHash: String
}, {
  timestamps: true,
  collection: 'dataDestructionCertificates'
});

// ================================================================
// COMPLIANCE TRACKING SCHEMA
// ================================================================
const complianceTrackingSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  complianceType: {
    type: String,
    enum: ['cpcb_epr', 'spcb_annual', 'hazardous_manifest', 'transport_permit'],
    required: true,
    index: true
  },
  
  reportingPeriodStart: {
    type: Date,
    required: true
  },
  reportingPeriodEnd: {
    type: Date,
    required: true
  },
  
  // Requirements
  requiredSubmissionDate: {
    type: Date,
    required: true
  },
  submissionStatus: {
    type: String,
    enum: ['pending', 'submitted', 'approved', 'rejected'],
    default: 'pending',
    index: true
  },
  actualSubmissionDate: Date,
  
  // Data aggregation
  totalEwasteGeneratedKg: { type: Number, default: 0 },
  totalRecycledKg: { type: Number, default: 0 },
  totalRefurbishedCount: { type: Number, default: 0 },
  totalHazardousKg: { type: Number, default: 0 },
  recoveryRatePercentage: Number,
  co2SavedEstimateKg: Number,
  
  // Department-wise breakdown
  departmentWiseData: [{
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    ewasteGeneratedKg: Number,
    recycledKg: Number,
    refurbishedCount: Number
  }],
  
  // Submission details
  reportFileUrl: String,
  submissionReferenceNo: String,
  regulatoryResponseUrl: String,
  
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedByRegulator: String,
  
  notes: String,
  complianceScore: Number, // 0-100
  nextReviewDate: Date
}, {
  timestamps: true,
  collection: 'complianceTracking'
});