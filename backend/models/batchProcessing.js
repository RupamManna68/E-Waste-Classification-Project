// models/processingBatches.js
const mongoose = require('mongoose');

const processingBatchesSchema = new mongoose.Schema({
  batchId: {
    type: String,
    required: true,
    match: /^BATCH-[A-Z0-9]+-[0-9]{8}-[0-9]{4}$/
  },
  facilityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  intakeIds: [{ type: mongoose.Schema.Types.ObjectId }],

  // Batch Classification
  batchType: {
    type: String,
    enum: [
      "SORTING", "DISMANTLING", "SHREDDING", "REFURBISHMENT",
      "DATA_DESTRUCTION", "MATERIAL_RECOVERY", "QUALITY_CONTROL", "PACKAGING"
    ],
    required: true
  },
  batchCategory: String,
  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH", "URGENT", "EXPEDITED"]
  },

  // Batch Contents
  contents: {
    totalItems: Number,
    totalInputWeightKg: Number,
    itemTypes: [{
      itemType: String,
      count: Number,
      weightKg: Number
    }],
    hazardousItems: { type: Number, default: 0 },
    dataSensitiveItems: { type: Number, default: 0 },
    refurbishableItems: { type: Number, default: 0 }
  },

  // Processing Timeline
  timeline: {
    scheduledStartTime: Date,
    actualStartTime: Date,
    scheduledEndTime: Date,
    actualEndTime: Date,
    totalProcessingTimeMinutes: Number,
    pausedTimeMinutes: { type: Number, default: 0 },
    effectiveProcessingTimeMinutes: Number
  },

  // Processing Team
  team: {
    supervisorName: String,
    operatorNames: [String],
    shiftDetails: String,
    qualityControlOfficer: String,
    safetyOfficer: String
  },

  // Equipment & Resources Used
  resources: {
    equipmentUsed: [String],
    consumablesUsed: [String],
    energyConsumption: Number,
    waterUsage: Number,
    chemicalsUsed: [{
      chemical: String,
      quantity: Number,
      unit: String,
      purpose: String
    }]
  },

  // Status & Progress
  status: {
    currentStatus: {
      type: String,
      enum: [
        "SCHEDULED", "IN_PROGRESS", "PAUSED", "QUALITY_CHECK",
        "REWORK_REQUIRED", "COMPLETED", "CANCELLED", "ON_HOLD", "FAILED"
      ]
    },
    progressPercentage: { type: Number, min: 0, max: 100 },
    itemsProcessed: { type: Number, default: 0 },
    itemsPending: Number,
    issues: [{
      issueType: String,
      description: String,
      severity: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
      reportedAt: Date,
      resolvedAt: Date,
      resolution: String
    }]
  },

  // Output Tracking
  outputs: {
    totalOutputWeightKg: Number,
    materialRecovery: [{
      materialType: String,
      weightKg: Number,
      purity: Number,
      grade: String,
      destinationType: {
        type: String,
        enum: ["RECYCLING", "REUSE", "REFURBISHMENT", "DISPOSAL"]
      }
    }],
    refurbishedItems: { type: Number, default: 0 },
    wasteGenerated: Number,
    hazardousWasteGenerated: Number
  },

  // Quality Metrics
  quality: {
    qualityScore: { type: Number, min: 0, max: 100 },
    defectsFound: { type: Number, default: 0 },
    reworkItems: { type: Number, default: 0 },
    rejectedItems: { type: Number, default: 0 },
    customerCompliance: { type: Boolean, default: true },
    regulatoryCompliance: { type: Boolean, default: true },
    qualityNotes: String
  },

  createdAt: Date,
  updatedAt: Date

}, {
  timestamps: true
});

module.exports = mongoose.model('ProcessingBatch', processingBatchesSchema);
