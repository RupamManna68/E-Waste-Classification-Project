// models/pickupOrder.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const pickupOrderSchema = new Schema({
    pickupOrderId: {
        type: String,
        required: true,
        match: /^PO-[A-Z0-9]+-[0-9]{8}-[0-9]{4}$/
    },
    lotId: { type: Schema.Types.ObjectId, required: true },
    vendorId: { type: Schema.Types.ObjectId, required: true },
    winningBidId: { type: Schema.Types.ObjectId, required: true },

    schedule: {
        scheduledDate: { type: Date, required: true },
        timeWindow: {
            startTime: String,
            endTime: String,
            estimatedDurationMinutes: { type: Number, default: 120 }
        },
        confirmedByVendor: { type: Boolean, default: false },
        confirmedByCollege: { type: Boolean, default: false },
        confirmationDeadline: Date
    },

    location: {
        pickupLocationId: { type: Schema.Types.ObjectId },
        address: {
            street: String,
            building: String,
            floor: String,
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
        accessInstructions: String,
        parkingInstructions: String,
        securityRequirements: String
    },

    contacts: {
        collegeContact: {
            name: String,
            designation: String,
            phone: String,
            alternatePhone: String,
            email: String
        },
        vendorContact: {
            name: String,
            designation: String,
            phone: String,
            alternatePhone: String,
            email: String
        }
    },

    transportation: {
        assignedVehicleId: { type: Schema.Types.ObjectId },
        vehicleDetails: {
            registrationNumber: String,
            vehicleType: String,
            capacity: Number,
            driverName: String,
            driverPhone: String,
            driverLicense: String
        },
        loadingEquipment: [String],
        packagingMaterials: [String],
        specialHandlingEquipment: [String]
    },

    documentation: {
        manifestNumber: String,
        challanNumber: String,
        transportPermitNumber: String,
        hazmatDeclaration: String,
        insurancePolicyNumber: String,
        customsDeclaration: String
    },

    inventory: {
        expectedItems: Number,
        expectedWeightKg: Number,
        actualItemsPickedUp: { type: Number, default: 0 },
        actualWeightKg: { type: Number, default: 0.0 },
        vehicleTareWeightKg: Number,
        vehicleGrossWeightKg: Number,
        calculatedLoadWeightKg: Number,
        weighbridgeTicketNumber: String,
        weightVarianceKg: { type: Number, default: 0.0 },
        weightVariancePercentage: { type: Number, default: 0.0 }
    },

    status: {
        currentStatus: {
            type: String,
            enum: [
                "SCHEDULED", "CONFIRMED", "VENDOR_EN_ROUTE", "ARRIVED_AT_LOCATION",
                "LOADING_IN_PROGRESS", "DOCUMENTATION_IN_PROGRESS", "WEIGHT_VERIFICATION",
                "READY_FOR_DEPARTURE", "DEPARTED", "IN_TRANSIT", "ARRIVED_AT_DESTINATION",
                "COMPLETED", "DELAYED", "CANCELLED", "INCIDENT", "PARTIAL_PICKUP"
            ]
        },
        actualStartTime: Date,
        actualEndTime: Date,
        totalDurationMinutes: Number,
        delayReasons: [String],
        incidentReports: [String],
        partialPickupReason: String,
        itemsLeftBehind: [{ type: Schema.Types.ObjectId }]
    },

    approvals: {
        collegeSignatory: {
            name: String,
            designation: String,
            userId: { type: Schema.Types.ObjectId },
            signatureTimestamp: Date,
            digitalSignature: String,
            ipAddress: String
        },
        vendorSignatory: {
            name: String,
            designation: String,
            signatureTimestamp: Date,
            digitalSignature: String,
            ipAddress: String
        },
        documentsComplete: { type: Boolean, default: false },
        handoverCertificateId: { type: Schema.Types.ObjectId }
    },

    createdBy: { type: Schema.Types.ObjectId },
    updatedBy: { type: Schema.Types.ObjectId },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: false // already have createdAt/updatedAt fields
});

module.exports = mongoose.model('PickupOrder', pickupOrderSchema);
