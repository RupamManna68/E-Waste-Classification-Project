// models/storageLocation.model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const storageLocationSchema = new Schema(
  {
    orgId: { type: Schema.Types.ObjectId, required: true, ref: "Organization" },
    locationCode: { type: String, required: true, maxlength: 20 },
    locationName: { type: String, required: true, maxlength: 100 },
    locationType: {
      type: String,
      enum: [
        "GENERAL",
        "HAZARDOUS",
        "SECURE",
        "BATTERY_STORAGE",
        "REFURB_AREA",
        "QUARANTINE",
        "EXPORT_READY"
      ],
      required: true
    },
    address: {
      building: String,
      floor: String,
      room: String,
      coordinates: {
        type: {
          type: String,
          enum: ["Point"]
        },
        coordinates: [Number] // [longitude, latitude]
      }
    },
    capacity: {
      maxWeightKg: Number,
      currentWeightKg: { type: Number, default: 0.0 },
      maxItemsCount: Number,
      currentItemsCount: { type: Number, default: 0 },
      volumeCubicMeters: Number,
      shelfConfiguration: [
        {
          shelfId: String,
          capacity: Number,
          occupied: { type: Number, default: 0.0 }
        }
      ]
    },
    security: {
      securityLevel: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "MAXIMUM"] },
      accessControl: [String],
      cameraIds: [String],
      alarmSystem: Boolean,
      fireSuppressionSystem: Boolean
    },
    environmental: {
      temperatureControlled: Boolean,
      humidityControlled: Boolean,
      ventilationSystem: Boolean,
      waterproofed: Boolean,
      groundingSystem: Boolean
    },
    compliance: {
      hazmatCertified: Boolean,
      fireNOC: String,
      environmentalClearance: String,
      insuranceCovered: Boolean
    },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true // Automatically adds createdAt & updatedAt
  }
);

export default mongoose.model("StorageLocation", storageLocationSchema);
