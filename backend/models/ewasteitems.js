// models/ewasteItem.model.js
import mongoose from "mongoose";

const ewasteItemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      match: /^HH302-[A-Z0-9]+-[0-9]{8}-[0-9]{6}$/
    },
    orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
    deptId: { type: mongoose.Schema.Types.ObjectId, required: true },
    coordinatorId: { type: mongoose.Schema.Types.ObjectId, required: true },

    itemType: {
      type: String,
      required: true,
      enum: [
        "DESKTOP_COMPUTER", "LAPTOP", "SERVER", "MONITOR_LCD", "MONITOR_CRT",
        "PRINTER_INKJET", "PRINTER_LASER", "SCANNER", "PROJECTOR", "MOBILE_PHONE",
        "TABLET", "NETWORKING_EQUIPMENT", "UPS", "KEYBOARD_MOUSE", "SPEAKERS",
        "CABLES", "MEMORY_DEVICES", "OTHER_IT_EQUIPMENT"
      ]
    },
    itemCategory: {
      type: String,
      enum: ["RECYCLABLE", "REUSABLE", "HAZARDOUS", "MIXED", "UNKNOWN"]
    },
    subcategory: String,

    assetInfo: {
      assetTag: String,
      serialNumber: String,
      make: String,
      model: String,
      partNumber: String,
      barcode: String
    },

    timeline: {
      purchaseDate: Date,
      installationDate: Date,
      warrantyStart: Date,
      warrantyEnd: Date,
      lastServiceDate: Date,
      decommissionDate: { type: Date, required: true },
      expectedPickupDate: Date
    },

    physical: {
      weight: {
        estimatedKg: Number,
        actualKg: Number,
        measuredAt: Date,
        measuredBy: mongoose.Schema.Types.ObjectId
      },
      dimensions: {
        lengthCm: Number,
        widthCm: Number,
        heightCm: Number,
        volumeCubicCm: Number
      },
      appearance: {
        color: String,
        finish: String,
        brandingVisible: Boolean
      }
    },

    condition: {
      workingCondition: {
        type: String,
        required: true,
        enum: ["WORKING", "PARTIALLY_WORKING", "NOT_WORKING", "UNKNOWN"]
      },
      cosmeticCondition: {
        type: String,
        enum: ["EXCELLENT", "GOOD", "FAIR", "POOR", "DAMAGED"]
      },
      functionalTests: {
        powerOn: Boolean,
        display: Boolean,
        connectivity: Boolean,
        performance: { type: String, enum: ["EXCELLENT", "GOOD", "FAIR", "POOR"] }
      },
      damageReport: [
        {
          type: { type: String, enum: ["PHYSICAL", "ELECTRICAL", "COSMETIC", "FUNCTIONAL"] },
          description: String,
          severity: { type: String, enum: ["MINOR", "MODERATE", "MAJOR", "CRITICAL"] },
          photoIds: [mongoose.Schema.Types.ObjectId]
        }
      ],
      accessories: [
        {
          type: String,
          present: Boolean,
          condition: { type: String, enum: ["WORKING", "NOT_WORKING", "DAMAGED"] }
        }
      ]
    },

    riskAssessment: {
      dataRisk: {
        containsData: { type: Boolean, default: false },
        dataClassification: { type: String, enum: ["PUBLIC", "INTERNAL", "CONFIDENTIAL", "RESTRICTED"] },
        dataWipeRequired: { type: Boolean, default: false },
        dataWipeMethod: { type: String, enum: ["SOFTWARE", "DEGAUSSING", "PHYSICAL_DESTRUCTION"] },
        encryptedStorage: Boolean
      },
      physicalRisk: {
        containsBattery: { type: Boolean, default: false },
        batteryType: {
          type: String,
          enum: [
            "LITHIUM_ION", "LITHIUM_POLYMER", "NICKEL_CADMIUM",
            "NICKEL_METAL_HYDRIDE", "LEAD_ACID", "ALKALINE", "OTHER", "NONE"
          ]
        },
        batteryCondition: { type: String, enum: ["GOOD", "SWOLLEN", "LEAKING", "DAMAGED"] },
        containsCRT: { type: Boolean, default: false },
        containsMercury: { type: Boolean, default: false },
        radioactiveComponents: { type: Boolean, default: false },
        hazardousMaterials: [
          {
            material: String,
            quantity: String,
            handlingInstructions: String
          }
        ]
      },
      complianceFlags: {
        requiresSpecialHandling: { type: Boolean, default: false },
        requiresHazmatTransport: { type: Boolean, default: false },
        requiresTSDFDisposal: { type: Boolean, default: false },
        exportRestricted: { type: Boolean, default: false }
      }
    },

    location: {
      currentLocationId: mongoose.Schema.Types.ObjectId,
      shelfPosition: String,
      binId: String,
      locationHistory: [
        {
          locationId: mongoose.Schema.Types.ObjectId,
          movedAt: Date,
          movedBy: mongoose.Schema.Types.ObjectId,
          reason: String
        }
      ]
    },

    digitalIdentity: {
      qrCode: {
        generated: { type: Boolean, default: false },
        qrCodeUrl: String,
        qrPayload: String,
        printCount: { type: Number, default: 0 },
        lastPrinted: Date,
        applied: { type: Boolean, default: false },
        appliedAt: Date,
        appliedBy: mongoose.Schema.Types.ObjectId
      },
      rfidTag: {
        tagId: String,
        applied: { type: Boolean, default: false },
        lastRead: Date
      },
      digitalTwinId: String
    },

    workflow: {
      currentStatus: {
        type: String,
        required: true,
        enum: [
          "CREATED", "PHOTOS_UPLOADED", "AI_PROCESSING", "AI_CATEGORIZED",
          "HUMAN_VERIFIED", "QR_GENERATED", "QR_PRINTED", "QR_ATTACHED",
          "TAGGED", "IN_STORAGE", "STORAGE_VERIFIED", "LISTED_FOR_BID",
          "BIDDING_ACTIVE", "BID_AWARDED", "SOLD", "PICKUP_SCHEDULED",
          "AWAITING_PICKUP", "PICKUP_IN_PROGRESS", "IN_TRANSIT",
          "TRANSIT_DELAYED", "ARRIVED_AT_FACILITY", "RECEIVED_BY_RECYCLER",
          "INTAKE_VERIFIED", "SORTING_QUEUE", "SORTING_IN_PROGRESS",
          "SORTED", "PROCESSING_QUEUE", "PROCESSING", "DATA_DESTRUCTION",
          "MATERIAL_RECOVERY", "REFURBISHMENT", "QUALITY_CHECK",
          "PROCESSED", "RECONCILIATION", "CERTIFICATE_PENDING",
          "CERTIFICATE_ISSUED", "COMPLIANCE_VERIFIED", "CLOSED",
          "DISCREPANCY", "INCIDENT", "ON_HOLD", "CERTIFICATE_REVISION_REQUIRED"
        ]
      },
      substatus: String,
      statusHistory: [
        {
          status: String,
          timestamp: Date,
          changedBy: mongoose.Schema.Types.ObjectId,
          reason: String,
          notes: String
        }
      ],
      alerts: [
        {
          alertType: { type: String, enum: ["DEADLINE", "COMPLIANCE", "SAFETY", "QUALITY"] },
          message: String,
          severity: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
          createdAt: Date,
          resolvedAt: Date
        }
      ]
    },

    financial: {
      bookValue: Number,
      depreciatedValue: Number,
      scrapValue: Number,
      disposalCost: Number,
      insuranceValue: Number,
      recoveredValue: Number
    },

    metadata: {
      originalUser: String,
      originalDepartment: String,
      decommissionReason: {
        type: String,
        enum: ["END_OF_LIFE", "OBSOLETE", "DAMAGED", "UPGRADE", "POLICY_CHANGE", "SECURITY_BREACH", "REPLACEMENT", "OTHER"]
      },
      specialInstructions: { type: String, maxlength: 1000 },
      complianceNotes: String,
      tags: [String],
      customFields: Object
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("EwasteItem", ewasteItemSchema);
