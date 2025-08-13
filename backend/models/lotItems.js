// models/LotItem.js
const mongoose = require('mongoose');

const LotItemSchema = new mongoose.Schema({
  lotId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Lot' },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Item' },
  sequenceNumber: { type: Number },

  itemDetails: {
    estimatedIndividualValue: { type: Number }, // double in MongoDB
    priorityLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"]
    },
    specialNotes: { type: String },
    handlingInstructions: { type: String }
  },

  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  addedAt: { type: Date },
  removedAt: { type: Date },
  removalReason: { type: String }
}, {
  timestamps: true // automatically manages createdAt & updatedAt
});

module.exports = mongoose.model('LotItem', LotItemSchema);
