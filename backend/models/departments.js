const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Organization",
    },
    deptCode: {
      type: String,
      required: true,
      maxlength: 15,
    },
    deptName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    deptType: {
      type: String,
      enum: ["ACADEMIC", "ADMINISTRATIVE", "RESEARCH", "SERVICE"],
    },
    headName: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    contactPhone: {
      type: String,
    },
    location: {
      building: { type: String },
      floor: { type: String },
      wing: { type: String },
      roomNumbers: [{ type: String }],
    },
    budget: {
      annualBudget: { type: Number },
      ewasteAllocation: { type: Number },
      fiscalYear: { type: String },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // automatically creates createdAt & updatedAt
  }
);

module.exports = mongoose.model("Department", DepartmentSchema);
