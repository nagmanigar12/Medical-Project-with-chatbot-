import express from "express";
import { getPatients, createPatient, getPatientById, updatePatient, deletePatient } from "../controllers/patientController.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
  .get(protect, getPatients)
  .post(protect, authorize("Admin", "Doctor", "Paramedic"), createPatient);

router.route("/:id")
  .get(protect, getPatientById)
  .put(protect, updatePatient)
  .delete(protect, authorize("Admin"), deletePatient);

export default router;


