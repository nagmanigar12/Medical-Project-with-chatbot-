import express from "express";
import { getIncidents, createIncident, createReview } from "../controllers/incidentController.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
  .get(protect, getIncidents)
  .post(protect, authorize("Admin", "Doctor", "Paramedic"), createIncident);

router.route("/review")
  .post(protect, authorize("Admin", "QA Officer"), createReview);

export default router;


