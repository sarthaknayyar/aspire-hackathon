const mongoose = require("mongoose");

const GrievanceSchema = new mongoose.Schema({
  grievanceCode: { type: String, unique: true },
  complainantName: String,
  complainantEmail: String,
  dateOfReceipt: Date,
  department: String,
  percentageCompletion: Number,
  isSpam: {type: Boolean, default: false},
  aiResolved:{type: Boolean, default: false},
  description: String,
  fileName: String,
  currentStatus: { type: String, enum: ["Complaint Filed", "Under Review", "Investigation", "Resolved" , "Rejected"], default: "Complaint Filed" },
}, { timestamps: true });

// Pre-save middleware to generate grievanceCode
GrievanceSchema.pre("save", async function (next) {
  if (!this.grievanceCode) {
    this.grievanceCode = `GRV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

module.exports = mongoose.model("Grievance", GrievanceSchema);
