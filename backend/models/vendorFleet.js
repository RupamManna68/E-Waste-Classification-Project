// models/vendorFleet.model.js
import mongoose from "mongoose";

const vendorFleetSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, required: true },

    vehicleInfo: {
      vehicleRegistration: {
        type: String,
        match: /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/,
        required: true,
      },
      vehicleType: {
        type: String,
        enum: ["TRUCK", "TEMPO", "VAN", "PICKUP", "CONTAINER", "TRAILER"],
        required: true,
      },
      make: { type: String },
      model: { type: String },
      year: { type: Number },
      fuelType: {
        type: String,
        enum: ["PETROL", "DIESEL", "CNG", "LPG", "ELECTRIC", "HYBRID"],
      },
      engineNumber: { type: String },
      chassisNumber: { type: String },
    },

    capacity: {
      maxLoadKg: { type: Number },
      volumeCubicM: { type: Number },
      passengerCapacity: { type: Number },
    },

    driverInfo: {
      primaryDriver: {
        name: { type: String },
        phone: { type: String },
        licenseNumber: { type: String },
        licenseExpiry: { type: Date },
        experienceYears: { type: Number },
      },
      backupDriver: {
        name: { type: String },
        phone: { type: String },
        licenseNumber: { type: String },
        licenseExpiry: { type: Date },
      },
    },

    compliance: {
      insurance: {
        policyNumber: { type: String },
        provider: { type: String },
        expiryDate: { type: Date },
        coverage: { type: Number },
      },
      permits: [
        {
          permitType: { type: String },
          permitNumber: { type: String },
          validFrom: { type: Date },
          validUntil: { type: Date },
          states: [{ type: String }],
        },
      ],
      pollutionCertificate: {
        certificateNumber: { type: String },
        expiryDate: { type: Date },
      },
      fitnessCertificate: {
        certificateNumber: { type: String },
        expiryDate: { type: Date },
      },
    },

    tracking: {
      gpsDeviceId: { type: String },
      gpsProvider: { type: String },
      lastLocation: {
        type: {
          type: String,
          enum: ["Point"],
        },
        coordinates: [{ type: Number }],
      },
      lastTracked: { type: Date },
    },

    maintenance: {
      lastServiceDate: { type: Date },
      nextServiceDue: { type: Date },
      servicingGarage: { type: String },
      maintenanceRecords: [
        {
          date: { type: Date },
          type: {
            type: String,
            enum: ["ROUTINE", "REPAIR", "BREAKDOWN", "ACCIDENT"],
          },
          description: { type: String },
          cost: { type: Number },
          garage: { type: String },
        },
      ],
    },

    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

vendorFleetSchema.index({ "tracking.lastLocation": "2dsphere" });

export default mongoose.model("VendorFleet", vendorFleetSchema);
