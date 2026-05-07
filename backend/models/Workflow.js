import mongoose from "mongoose";

const WorkflowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  organizationId: { type: String },
  fields: [{
    id: { type: String },
    type: { type: String },
    label: { type: String },
    required: { type: Boolean, default: false },
    options: [{ type: String }]
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Workflow", WorkflowSchema);


