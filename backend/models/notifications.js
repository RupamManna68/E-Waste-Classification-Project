// ================================================================
// NOTIFICATIONS SCHEMA
// ================================================================
const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  // Recipient
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  role: String, // If sending to all users with specific role
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  
  // Notification details
  notificationType: {
    type: String,
    enum: ['info', 'warning', 'alert', 'reminder', 'approval_required'],
    required: true
  },
  category: {
    type: String,
    enum: ['item_status', 'certificate', 'compliance', 'incident', 'auction', 'system'],
    required: true,
    index: true
  },
  
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  actionUrl: String,
  
  // Context references
  itemId: {
    type: String,
    ref: 'EwasteItem'
  },
  lotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuctionLot'
  },
  certificateId: {
    type: String,
    ref: 'Certificate'
  },
  incidentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incident'
  },
  
  // Status
  isRead: {
    type: Boolean,
    default: false,
    index: true
  },
  readAt: Date,
  isDismissed: {
    type: Boolean,
    default: false
  },
  dismissedAt: Date,
  
  // Scheduling
  sendAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  expiresAt: Date,
  
  // Delivery tracking
  deliveryMethod: {
    type: String,
    enum: ['in_app', 'email', 'sms', 'push'],
    default: 'in_app'
  },
  deliveryStatus: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'failed'],
    default: 'pending'
  },
  deliveryAttempts: { type: Number, default: 0 }
}, {
  timestamps: true,
  collection: 'notifications'
});
