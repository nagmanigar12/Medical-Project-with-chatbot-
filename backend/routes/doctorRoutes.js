import express from "express";
import { protect } from "../middlewares/auth.js";
import { getDoctors } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/", protect, getDoctors);

export default router;
