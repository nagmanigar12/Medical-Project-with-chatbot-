import Incident from "../models/Incident.js";
import QAReview from "../models/QAReview.js";

export const getIncidents = async (req, res) => {
  try {
    const filter = {};
    if (req.user && req.user.organization) {
      filter.organizationId = req.user.organization;
    }
    const incidents = await Incident.find(filter).populate("patientId", "firstName lastName");
    res.json(incidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createIncident = async (req, res) => {
  try {
    const incidentData = {
      ...req.body,
      organizationId: req.user ? req.user.organization : req.body.organizationId,
      createdBy: req.user ? req.user._id : req.body.createdBy
    };
    const incident = await Incident.create(incidentData);
    res.status(201).json(incident);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid incident data" });
  }
};

export const createReview = async (req, res) => {
  try {
    const reviewData = {
      ...req.body,
      reviewerId: req.user ? req.user._id : req.body.reviewerId,
      organizationId: req.user ? req.user.organization : req.body.organizationId
    };
    const review = await QAReview.create(reviewData);

    // Update incident status based on provided status in body
    const newStatus = req.body.status === "Approved" ? "Completed" : "Rejected";
    await Incident.findByIdAndUpdate(req.body.incidentId, { status: newStatus });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid review data" });
  }
};


