// models/VendorBid.js
const mongoose = require('mongoose');

const VendorBidSchema = new mongoose.Schema({
  bidId: {
    type: String,
    required: true,
    match: /^BID-[A-Z0-9]+-[0-9]{8}-[0-9]{4}$/
  },
  lotId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Lot' },
  vendorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Vendor' },

  // Financial Details
  financial: {
    bidAmount: { type: Number, required: true, min: 0 },
    bidType: {
      type: String,
      required: true,
      enum: ["PURCHASE", "SERVICE_FEE", "REVENUE_SHARE", "PROCESSING_COST"]
    },
    currency: { type: String, default: "INR" },
    paymentTerms: {
      type: String,
      enum: ["ADVANCE", "IMMEDIATE", "NET_15", "NET_30", "NET_45", "CUSTOM"]
    },
    paymentMethod: {
      type: String,
      enum: ["BANK_TRANSFER", "CHEQUE", "DD", "LC", "ONLINE", "CASH"]
    },
    customPaymentTerms: { type: String },
    gstIncluded: { type: Boolean, default: false },
    additionalCharges: [{
      chargeType: String,
      amount: Number,
      description: String
    }]
  },

  // Service Commitments
  serviceCommitments: {
    pickupCommitmentDays: { type: Number, min: 1, max: 30 },
    processingCommitmentDays: { type: Number, min: 1, max: 90 },
    certificateDeliveryDays: { type: Number, min: 1, max: 30 },
    proposedPickupDate: { type: Date },
    flexibilityInDates: { type: Boolean, default: false },
    expeditedProcessingAvailable: { type: Boolean, default: false },
    expeditedProcessingCost: { type: Number }
  },

  // Logistics Plan
  logistics: {
    transportArrangement: {
      type: String,
      enum: ["OWN_FLEET", "HIRED_TRANSPORT", "THIRD_PARTY_LOGISTICS", "COLLEGE_ASSISTANCE"]
    },
    assignedVehicleId: { type: mongoose.Schema.Types.ObjectId },
    backupVehicleIds: [{ type: mongoose.Schema.Types.ObjectId }],
    driverDetails: {
      primaryDriver: String,
      backupDriver: String,
      contactNumber: String
    },
    loadingEquipment: [String],
    packagingMaterials: [String],
    insuranceCoverage: Number,
    trackingCapability: { type: Boolean, default: false },
    contingencyPlan: String
  },

  // Technical Capabilities
  technical: {
    recyclingRate: { type: Number, min: 0, max: 100 },
    refurbishmentCapability: { type: Boolean, default: false },
    refurbishmentPercentage: { type: Number, min: 0, max: 100 },
    dataDestructionCertified: { type: Boolean, default: false },
    dataDestructionMethods: [String],
    processingTechnologies: [{
      technology: String,
      capacity: String,
      certified: Boolean
    }],
    facilityCertifications: [String],
    specialHandlingCapabilities: [String],
    qualityAssuranceProcess: String,
    materialRecoveryTargets: {
      metals: Number,
      plastics: Number,
      glass: Number,
      rareMaterials: Number
    }
  },

  // Value Propositions
  valuePropositions: {
    environmentalBenefits: [String],
    socialImpact: [String],
    addedServices: [String],
    innovativeApproaches: [String],
    sustainabilityCommitments: [String],
    partnershipBenefits: String,
    longTermValue: String
  },

  // Bid Status
  bidStatus: {
    currentStatus: {
      type: String,
      enum: [
        "DRAFT", "SUBMITTED", "UNDER_TECHNICAL_REVIEW", "UNDER_FINANCIAL_REVIEW",
        "CLARIFICATIONS_REQUESTED", "CLARIFICATIONS_SUBMITTED", "QUALIFIED",
        "DISQUALIFIED", "ACCEPTED", "REJECTED", "WITHDRAWN", "EXPIRED"
      ]
    },
    submissionTime: Date,
    lastModifiedTime: Date,
    validUntil: Date,
    clarificationsRequested: [{
      question: String,
      requestedAt: Date,
      response: String,
      respondedAt: Date
    }]
  },

  // Evaluation Scores
  evaluation: {
    technicalScore: { type: Number, min: 0, max: 100 },
    financialScore: { type: Number, min: 0, max: 100 },
    complianceScore: { type: Number, min: 0, max: 100 },
    pastPerformanceScore: { type: Number, min: 0, max: 100 },
    sustainabilityScore: { type: Number, min: 0, max: 100 },
    overallScore: { type: Number, min: 0, max: 100 },
    ranking: Number,
    evaluatedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    evaluationNotes: String,
    evaluationCompletedAt: Date
  },

  // Attachments
  attachments: [{
    documentType: String,
    fileName: String,
    fileId: { type: mongoose.Schema.Types.ObjectId }, // GridFS reference
    description: String,
    uploadedAt: Date
  }],

  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true // Automatically adds createdAt & updatedAt
});

module.exports = mongoose.model('VendorBid', VendorBidSchema);
