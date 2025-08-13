// models/transitTracking.js
const mongoose = require('mongoose');

const transitTrackingSchema = new mongoose.Schema({
  pickupOrderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId },

  // Location & Time Data
  timestamp: { type: Date, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: { type: [Number], required: true }
  },
  locationMetadata: {
    accuracy: Number,   // meters
    altitude: Number,   // meters
    speed: Number,      // km/h
    heading: Number,    // degrees
    address: String,
    city: String,
    state: String
  },

  // Event Information
  eventType: {
    type: String,
    enum: [
      'DEPARTURE', 'EN_ROUTE', 'SCHEDULED_STOP', 'UNSCHEDULED_STOP',
      'FUEL_BREAK', 'MEAL_BREAK', 'REST_BREAK', 'TRAFFIC_DELAY',
      'ROUTE_DEVIATION', 'MAINTENANCE_ISSUE', 'EMERGENCY_STOP',
      'CHECKPOINT', 'BORDER_CROSSING', 'ARRIVAL', 'DELIVERY'
    ]
  },
  eventDetails: {
    duration: Number, // minutes
    reason: String,
    plannedStop: { type: Boolean, default: false },
    reportedBy: String, // driver/system
    verification: {
      type: String,
      enum: ['AUTOMATIC', 'DRIVER_REPORTED', 'ADMIN_VERIFIED', 'DISPUTED']
    }
  },

  // Vehicle Status
  vehicleStatus: {
    engineStatus: { type: String, enum: ['RUNNING', 'STOPPED', 'IDLE', 'UNKNOWN'] },
    fuelLevel: Number, // percentage
    batteryLevel: Number, // percentage
    temperature: Number, // celsius
    doorStatus: { type: String, enum: ['CLOSED', 'OPEN', 'TAMPERED', 'UNKNOWN'] },
    alarmStatus: { type: String, enum: ['NORMAL', 'TRIGGERED', 'DISABLED', 'UNKNOWN'] }
  },

  // Route Information
  routeInfo: {
    expectedRoute: Boolean,
    deviationDistance: Number, // km
    estimatedArrivalTime: Date,
    distanceRemaining: Number, // km
    trafficConditions: {
      type: String,
      enum: ['CLEAR', 'LIGHT', 'MODERATE', 'HEAVY', 'BLOCKED']
    }
  },

  // Data Source
  dataSource: {
    source: { type: String, enum: ['GPS_DEVICE', 'MOBILE_APP', 'DRIVER_REPORT', 'ADMIN_UPDATE'] },
    deviceId: String,
    deviceModel: String,
    signalStrength: Number, // percentage
    batteryLevel: Number,   // device battery %
    lastSyncTime: Date
  }

}, {
  timestamps: true
});

// Create geospatial index for location
transitTrackingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('TransitTracking', transitTrackingSchema);
