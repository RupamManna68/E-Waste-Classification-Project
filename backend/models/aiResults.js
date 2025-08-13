// models/aiProcessingResults.model.js
const mongoose = require("mongoose");

const aiProcessingResultsSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    mediaId: { type: mongoose.Schema.Types.ObjectId }, // Optional reference to media
    processingType: {
      type: String,
      enum: [
        "OBJECT_DETECTION",
        "CLASSIFICATION",
        "OCR",
        "DAMAGE_ASSESSMENT",
        "BRAND_RECOGNITION",
        "CONDITION_ANALYSIS",
        "HAZMAT_DETECTION",
        "COMPONENT_IDENTIFICATION",
        "TEXT_EXTRACTION",
        "QUALITY_ASSESSMENT"
      ],
      required: true
    },
    modelInfo: {
      modelName: { type: String, required: true },
      version: { type: String, required: true },
      provider: { type: String },
      modelType: { type: String, enum: ["CNN", "YOLO", "TRANSFORMER", "CUSTOM", "ENSEMBLE"] },
      trainingDataset: { type: String }
    },
    processing: {
      startTime: Date,
      endTime: Date,
      processingTimeMs: Number,
      computeResources: String,
      batchId: String
    },
    results: {
      confidence: { type: Number, min: 0.0, max: 1.0 },
      detectedObjects: [
        {
          objectType: String,
          confidence: Number,
          boundingBox: {
            x: Number,
            y: Number,
            width: Number,
            height: Number
          }
        }
      ],
      classifications: [
        {
          category: String,
          confidence: Number,
          subcategories: [String]
        }
      ],
      extractedText: [
        {
          text: String,
          confidence: Number,
          boundingBox: Object,
          textType: {
            type: String,
            enum: ["SERIAL_NUMBER", "MODEL", "BRAND", "ASSET_TAG", "OTHER"]
          }
        }
      ],
      attributes: {
        batteryPresent: Boolean,
        screenType: String,
        portTypes: [String],
        damageVisible: Boolean,
        brand: String,
        model: String,
        colorPrimary: String
      },
      riskFactors: [
        {
          riskType: { type: String, enum: ["BATTERY", "CRT", "MERCURY", "LEAD", "BERYLLIUM"] },
          confidence: Number,
          severity: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] }
        }
      ],
      qualityMetrics: {
        imageQuality: Number,
        lightingQuality: Number,
        clarityScore: Number,
        completenessScore: Number
      }
    },
    humanVerification: {
      verified: { type: Boolean, default: false },
      verificationResult: {
        type: String,
        enum: ["CORRECT", "INCORRECT", "PARTIALLY_CORRECT", "NEEDS_REPROCESSING"]
      },
      verifiedBy: mongoose.Schema.Types.ObjectId,
      verifiedAt: Date,
      corrections: Object,
      verificationNotes: String
    },
    feedback: {
      accuracyScore: Number,
      falsePositives: [String],
      missedDetections: [String],
      improvementSuggestions: String
    },
    processedAt: Date,
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("AIProcessingResult", aiProcessingResultsSchema);
