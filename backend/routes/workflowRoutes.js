import express from "express";
import { getWorkflows, createWorkflow, getWorkflowById } from "../controllers/workflowController.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
  .get(protect, getWorkflows)
  .post(protect, authorize("Admin", "Doctor"), createWorkflow);

router.route("/:id")
  .get(protect, getWorkflowById);

export default router;


