import mongoose from "mongoose";
import User from "../models/User.js";
import Patient from "../models/Patient.js";

export const seedData = async () => {
  if (mongoose.connection.readyState !== 1) {
    console.log("Mongoose not connected. Skipping seeding.");
    return;
  }
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("Seeding initial data...");
      
      const admin = await User.create({
        name: "System Admin",
        email: "admin@medisync.ai",
        password: "password123", // Will be hashed by pre-save hook
        role: "Admin",
        organization: "MediSync Global"
      });

      const doctor = await User.create({
        name: "Dr. Sarah Mitchell",
        email: "doctor@hospital.com",
        password: "password123",
        role: "Doctor",
        organization: "City General Hospital",
        department: "Emergency Medicine",
        specialization: "Critical Care",
        experienceYears: 12,
        qualifications: ["MD", "FRCP"],
        phone: "+1-555-0123",
        bio: "Experienced clinician focusing on critical care and emergency response."
      });

      await Patient.create([
        {
          firstName: "John",
          lastName: "Doe",
          dateOfBirth: new Date("1985-05-12"),
          gender: "Male",
          bloodType: "O+",
          allergies: ["Penicillin"],
          medicalHistory: ["Hypertension"],
          organizationId: "City General Hospital",
          createdBy: doctor._id,
          status: "Stable",
          riskScore: 25,
          vitals: {
            spO2: 97,
            temperature: 36.8,
            respiratoryRate: 16
          },
          bloodReport: {
            hemoglobin: 13.5,
            whiteCellCount: 6.1,
            platelets: 250,
            glucose: 98,
            creatinine: 0.9,
            systolic: 128,
            diastolic: 82
          }
        },
        {
          firstName: "Emma",
          lastName: "Wilson",
          dateOfBirth: new Date("1992-11-28"),
          gender: "Female",
          bloodType: "A-",
          allergies: ["Latex"],
          medicalHistory: ["Asthma"],
          organizationId: "City General Hospital",
          createdBy: doctor._id,
          status: "Critical",
          riskScore: 85,
          vitals: {
            spO2: 89,
            temperature: 38.4,
            respiratoryRate: 22
          },
          bloodReport: {
            hemoglobin: 10.8,
            whiteCellCount: 12.4,
            platelets: 210,
            glucose: 140,
            creatinine: 1.3,
            systolic: 154,
            diastolic: 98
          }
        }
      ]);

      console.log("Seeding complete.");
    }
  } catch (err) {
    console.error("Seeding error:", err);
  }
};


