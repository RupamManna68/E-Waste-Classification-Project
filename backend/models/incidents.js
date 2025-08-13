// INCIDENTS SCHEMA
// ================================================================
const mongoose = require('mongoose');
const incidentSchema = new mongoose.Schema({
  incidentType: {
    type: String,
    enum: ['weight_mismatch', 'missing_item', 'damaged_qr', 'theft', 'safety_hazard', 
           'vendor_noncompliance', 'data_breach', 'transport_delay', 'other'],
    required: true,
    index: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['open', 'investigating', 'resolved', 'closed'],
    default: 'open',
    index: true
  },
  
  // Context
  itemId: {
    type: String,
    ref: 'EwasteItem'
  },
  lotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuctionLot'
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor'
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StorageLocation'
  },
  
  // Details
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  impactAssessment: String,
  rootCause: String,
  
  // People involved
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Timeline
  incidentDate: {
    type: Date,
    required: true
  },
  reportedAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: Date,
  
  // Evidence
  evidencePhotos: [String],
  evidenceDocuments: [String],
  witnessStatements: String,
  
  // Resolution
  resolutionSummary: String,
  correctiveActions: String,
  preventiveMeasures: String,
  
  // Regulatory reporting
  regulatoryNotificationRequired: {
    type: Boolean,
    default: false
  },
  regulatoryNotificationSent: {
    type: Boolean,
    default: false
  },
  regulatoryReferenceNo: String,
  
  // Follow-up
  followUpRequired: { type: Boolean, default: false },
  followUpDate: Date,
  
  tags: [String] // For categorization and search
}, {
  timestamps: true,
  collection: 'incidents'
});