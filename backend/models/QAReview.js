import mongoose from "mongoose";

const QAReviewSchema = new mongoose.Schema({
  incidentId: { type: mongoose.Schema.Types.ObjectId, ref: "Incident", required: true },
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{
    text: { type: String },
    timestamp: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  }],
  score: { type: Number },
  status: { type: String },
  organizationId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("QAReview", QAReviewSchema);


