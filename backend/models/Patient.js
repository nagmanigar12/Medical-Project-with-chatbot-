import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  bloodType: { type: String },
  allergies: [{ type: String }],
  medicalHistory: [{ type: String }],
  organizationId: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "Stable" },
  riskScore: { type: Number, default: 0 },
  vitals: {
    spO2: { type: Number },
    temperature: { type: Number },
    respiratoryRate: { type: Number }
  },
  bloodReport: {
    hemoglobin: { type: Number },
    whiteCellCount: { type: Number },
    platelets: { type: Number },
    glucose: { type: Number },
    creatinine: { type: Number },
    systolic: { type: Number },
    diastolic: { type: Number }
  },
  medications: [
    {
      name: { type: String },
      dosage: { type: String },
      route: { type: String },
      time: { type: String }
    }
  ],
  incidentReports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident"
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Patient", PatientSchema);


