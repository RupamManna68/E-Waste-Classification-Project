// models/materialRecovery.js
const mongoose = require('mongoose');

const materialRecoverySchema = new mongoose.Schema({
  batchId: { type: mongoose.Schema.Types.ObjectId, required: true },
  itemIds: [{ type: mongoose.Schema.Types.ObjectId }],

  // Material Classification
  materialType: {
    type: String,
    enum: [
      "COPPER", "ALUMINUM", "STEEL", "IRON", "GOLD", "SILVER", "PLATINUM",
      "PALLADIUM", "PLASTIC_ABS", "PLASTIC_PC", "PLASTIC_PS", "PLASTIC_PVC",
      "GLASS_CRT", "GLASS_LCD", "GLASS_OTHER", "BATTERY_LITHIUM", "BATTERY_NICAD",
      "BATTERY_LEAD_ACID", "PCB_HIGH_GRADE", "PCB_LOW_GRADE", "CABLES",
      "TRANSFORMER", "CAPACITOR", "RESISTOR", "IC_CHIP", "MEMORY_MODULE",
      "HARD_DRIVE", "OPTICAL_DRIVE", "POWER_SUPPLY", "MOTHERBOARD", "OTHER"
    ],
    required: true
  },
  materialGrade: {
    type: String,
    enum: ["PREMIUM", "HIGH", "MEDIUM", "LOW", "CONTAMINATED"]
  },
  materialCategory: {
    type: String,
    enum: ["PRECIOUS_METALS", "BASE_METALS", "PLASTICS", "GLASS", "ELECTRONICS", "HAZARDOUS"]
  },

  // Quantity & Quality
  quantity: {
    recoveredWeightKg: { type: Number, required: true, min: 0 },
    purityPercentage: { type: Number, min: 0, max: 100 },
    moistureContent: { type: Number, min: 0, max: 100 },
    contaminationLevel: { type: Number, min: 0, max: 100 },
    particleSize: String,
    density: Number
  },

  // Processing Method
  processing: {
    method: {
      type: String,
      enum: [
        "MANUAL_DISMANTLING", "MECHANICAL_SHREDDING", "MAGNETIC_SEPARATION",
        "EDDY_CURRENT_SEPARATION", "DENSITY_SEPARATION", "FLOTATION",
        "HYDROMETALLURGY", "PYROMETALLURGY", "BIOLEACHING", "ELECTROLYSIS", "OTHER"
      ]
    },
    equipmentUsed: [String],
    processingTemperature: Number, // °C
    processingTime: Number, // minutes
    chemicalsUsed: [String],
    energyConsumption: Number, // kWh per kg
    waterUsage: Number, // liters per kg
    yieldPercentage: Number
  },

  // Quality Testing
  testing: {
    testMethod: String,
    testingDate: Date,
    testingLaboratory: String,
    testingStandard: String,
    testResults: mongoose.Schema.Types.Mixed, // Flexible structure
    certificateNumber: String,
    testReportFileId: mongoose.Schema.Types.ObjectId // GridFS ID
  },

  // Market Information
  marketInfo: {
    currentMarketPrice: Number, // per kg
    priceDate: Date,
    marketTrend: { type: String, enum: ["RISING", "STABLE", "FALLING", "VOLATILE"] },
    demandLevel: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "VERY_HIGH"] },
    potentialBuyers: [String],
    estimatedValue: Number
  },

  // Storage & Handling
  storage: {
    storageLocation: String,
    storageContainerType: String,
    storageDate: Date,
    storageConditions: String,
    shelfLife: Number, // days
    handlingPrecautions: [String],
    safetyDataSheet: mongoose.Schema.Types.ObjectId // GridFS ID
  },

  // Disposal Information
  disposal: {
    disposalRequired: { type: Boolean, default: false },
    disposalMethod: {
      type: String,
      enum: ["LANDFILL", "INCINERATION", "CHEMICAL_TREATMENT", "TSDF", "EXPORT"]
    },
    disposalFacility: String,
    disposalCost: Number,
    disposalDate: Date,
    manifests: [String]
  },

  recoveredAt: Date,
  recordedBy: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MaterialRecovery', materialRecoverySchema);
