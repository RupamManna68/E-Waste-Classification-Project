// models/recyclerFacilities.js
const mongoose = require('mongoose');

const recyclerFacilitiesSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  facilityCode: { type: String, required: true, match: /^FAC-[A-Z0-9]{6,15}$/ },
  facilityName: { type: String, required: true, maxlength: 200 },
  facilityType: {
    type: String,
    enum: [
      "DISMANTLING", "RECYCLING", "REFURBISHMENT", "DATA_DESTRUCTION",
      "MATERIAL_RECOVERY", "TSDF", "STORAGE", "SORTING", "INTEGRATED"
    ],
    required: true
  },

  // Location Information
  location: {
    address: {
      street: String,
      area: String,
      city: String,
      district: String,
      state: String,
      pincode: String,
      country: { type: String, default: "India" },
      gpsCoordinates: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point'
        },
        coordinates: [Number]
      }
    },
    operationalArea: Number,
    storageArea: Number,
    coveredArea: Number,
    openArea: Number
  },

  // Operational Capacity
  capacity: {
    dailyProcessingCapacityKg: Number,
    monthlyProcessingCapacityKg: Number,
    storageCapacityKg: Number,
    currentInventoryKg: { type: Number, default: 0.0 },
    employeeCount: Number,
    shiftsPerDay: Number,
    workingDaysPerWeek: Number,
    peakCapacityUtilization: Number
  },

  // Equipment & Technology
  equipment: [{
    equipmentType: String,
    equipmentName: String,
    manufacturer: String,
    model: String,
    capacity: String,
    installationDate: Date,
    lastMaintenanceDate: Date,
    operationalStatus: {
      type: String,
      enum: ["OPERATIONAL", "MAINTENANCE", "BREAKDOWN", "RETIRED"]
    },
    certifications: [String]
  }],

  // Compliance & Certifications
  compliance: {
    cpcbAuthorization: {
      authorizationNumber: String,
      validFrom: Date,
      validUntil: Date,
      authorizedCategories: [String],
      conditions: [String]
    },
    spcbClearance: {
      clearanceNumber: String,
      issuedDate: Date,
      validUntil: Date
    },
    otherCertifications: [{
      certificationType: String,
      certificateNumber: String,
      issuingBody: String,
      issuedDate: Date,
      expiryDate: Date,
      scope: String
    }]
  },

  // Safety & Environmental Systems
  safetyCompliance: {
    fireNOC: String,
    explosionProofCertificate: String,
    environmentalClearance: String,
    wasteWaterTreatment: { type: Boolean, default: false },
    airPollutionControl: { type: Boolean, default: false },
    solidWasteManagement: { type: Boolean, default: false },
    emergencyResponsePlan: { type: Boolean, default: false },
    safetyTrainingProgram: { type: Boolean, default: false }
  },

  // Performance Metrics
  performance: {
    averageProcessingTimeHours: Number,
    materialRecoveryRate: Number,
    refurbishmentSuccessRate: Number,
    certificateDeliveryTimeAvgDays: Number,
    qualityIncidents: { type: Number, default: 0 },
    environmentalIncidents: { type: Number, default: 0 },
    safetyIncidents: { type: Number, default: 0 },
    customerSatisfactionScore: Number
  },

  isActive: { type: Boolean, default: true },
  operationalStatus: {
    type: String,
    enum: ["OPERATIONAL", "MAINTENANCE", "EXPANSION", "CLOSED", "SUSPENDED"]
  },
  createdAt: Date,
  updatedAt: Date

}, {
  timestamps: true
});

// Index for geospatial queries
recyclerFacilitiesSchema.index({ 'location.address.gpsCoordinates': '2dsphere' });

module.exports = mongoose.model('RecyclerFacility', recyclerFacilitiesSchema);
