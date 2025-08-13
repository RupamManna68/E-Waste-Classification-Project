// models/auctionLot.model.js
const mongoose = require('mongoose');

const auctionLotSchema = new mongoose.Schema({
  lotId: { 
    type: String, 
    match: /^LOT-[A-Z0-9]+-[0-9]{8}-[0-9]{4}$/, 
    required: true 
  },
  orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
  lotName: { type: String, maxlength: 200, required: true },
  description: { type: String, maxlength: 2000 },
  lotType: { 
    type: String, 
    enum: [
      "MIXED", "COMPUTERS", "MONITORS", "PRINTERS", "MOBILE_DEVICES",
      "NETWORKING", "SERVERS", "HAZARDOUS", "BATTERIES", "CABLES", "ACCESSORIES"
    ],
    required: true
  },

  composition: {
    totalItems: { type: Number, min: 1 },
    totalEstimatedWeightKg: Number,
    totalActualWeightKg: Number,
    itemBreakdown: [{
      itemType: String,
      count: Number,
      estimatedWeightKg: Number
    }],
    categoryBreakdown: {
      recyclable: { type: Number, default: 0 },
      reusable: { type: Number, default: 0 },
      hazardous: { type: Number, default: 0 },
      mixed: { type: Number, default: 0 },
      unknown: { type: Number, default: 0 }
    },
    conditionBreakdown: {
      working: { type: Number, default: 0 },
      partiallyWorking: { type: Number, default: 0 },
      notWorking: { type: Number, default: 0 },
      unknown: { type: Number, default: 0 }
    }
  },

  financial: {
    reservePrice: { type: Number, min: 0 },
    startingBid: { type: Number, min: 0 },
    bidIncrement: { type: Number, min: 1 },
    estimatedValue: Number,
    currency: { type: String, default: "INR" },
    paymentTerms: { type: String, enum: ["IMMEDIATE", "NET_15", "NET_30", "NET_45", "CUSTOM"] },
    gstApplicable: { type: Boolean, default: true },
    tcsApplicable: { type: Boolean, default: false }
  },

  schedule: {
    creationDate: Date,
    listingStart: { type: Date, required: true },
    biddingStart: { type: Date, required: true },
    biddingEnd: { type: Date, required: true },
    evaluationPeriod: Number, // hours
    awardNotification: Date,
    pickupWindow: {
      startDate: Date,
      endDate: Date,
      timeSlots: [{
        startTime: String,
        endTime: String,
        available: { type: Boolean, default: true }
      }]
    }
  },

  evaluation: {
    selectionMethod: {
      type: String,
      enum: ["HIGHEST_BID", "WEIGHTED_SCORE", "ADMIN_CHOICE", "MULTI_PARAMETER", "L1_PLUS_TECHNICAL"]
    },
    criteria: {
      priceWeight: { type: Number, min: 0, max: 1 },
      complianceWeight: { type: Number, min: 0, max: 1 },
      performanceWeight: { type: Number, min: 0, max: 1 },
      technicalWeight: { type: Number, min: 0, max: 1 },
      sustainabilityWeight: { type: Number, min: 0, max: 1 }
    },
    minimumRequirements: {
      cpcbRegistered: { type: Boolean, default: true },
      minimumExperience: Number,
      minimumTurnover: Number,
      geographicRestrictions: [String],
      certificationRequirements: [String]
    }
  },

  logistics: {
    pickupLocationId: mongoose.Schema.Types.ObjectId,
    pickupAddress: {
      street: String,
      area: String,
      city: String,
      state: String,
      pincode: String,
      landmark: String,
      gpsCoordinates: {
        type: { type: String, enum: ["Point"] },
        coordinates: [Number]
      }
    },
    contactPersons: [{
      name: String,
      designation: String,
      phone: String,
      email: String,
      availability: String
    }],
    accessRequirements: String,
    loadingFacilities: String,
    specialHandlingNotes: String
  },

  status: {
    currentStatus: {
      type: String,
      enum: [
        "DRAFT", "PUBLISHED", "BIDDING_ACTIVE", "BIDDING_CLOSED",
        "UNDER_EVALUATION", "TECHNICAL_EVALUATION", "FINANCIAL_EVALUATION",
        "AWARDED", "PICKUP_SCHEDULED", "PICKUP_IN_PROGRESS", "PICKUP_COMPLETED",
        "COMPLETED", "CANCELLED", "EXPIRED", "DISPUTED"
      ]
    },
    publishedAt: Date,
    bidsReceived: { type: Number, default: 0 },
    qualifiedBids: { type: Number, default: 0 },
    winnerVendorId: mongoose.Schema.Types.ObjectId,
    winningBidId: mongoose.Schema.Types.ObjectId,
    winningBidAmount: Number,
    awardedAt: Date,
    awardJustification: String,
    completionRate: { type: Number, min: 0, max: 100 }
  },

  compliance: {
    requiresDataDestruction: { type: Boolean, default: false },
    requiresHazmatHandling: { type: Boolean, default: false },
    requiresTSDFDisposal: { type: Boolean, default: false },
    environmentalImpactAssessment: String,
    regulatoryRequirements: [String],
    auditRequirements: [String]
  },

  createdBy: mongoose.Schema.Types.ObjectId,
  lastModifiedBy: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model('AuctionLot', auctionLotSchema);
