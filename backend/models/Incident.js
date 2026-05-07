import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  type: { type: String }, // e.g., "Medical", "Trauma", "Cardiac"
  description: { type: String },
  location: { type: String },
  vitalsAtTime: {
    spO2: { type: Number },
    temperature: { type: Number },
    respiratoryRate: { type: Number }
  },
  interventions: [{
    name: { type: String },
    time: { type: Date },
    pushedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  }],
  status: { type: String, default: "Open" },
  organizationId: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Incident", IncidentSchema);


