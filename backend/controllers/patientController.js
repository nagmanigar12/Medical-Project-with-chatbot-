import Patient from "../models/Patient.js";

export const getPatients = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role !== "Admin") {
      filter.organizationId = req.user.organization;
    }
    const patients = await Patient.find(filter).populate(
      "createdBy",
      "name email role organization department specialization experienceYears qualifications phone bio createdAt"
    );
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createPatient = async (req, res) => {
  try {
    const patientData = {
      ...req.body,
      organizationId: req.user.organization,
      createdBy: req.user._id
    };
    const patient = await Patient.create(patientData);
    req.io.emit("newPatient", { patient, organization: req.user.organization });
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: "Invalid patient data" });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "createdBy",
      "name email role organization department specialization experienceYears qualifications phone bio createdAt"
    );
    if (!patient) return res.status(404).json({ error: "Not found" });
    
    if (req.user.role !== "Admin" && patient.organizationId !== req.user.organization) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: "Not found" });

    if (req.user.role !== "Admin" && patient.organizationId !== req.user.organization) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    req.io.emit("updatePatient", { patient: updated, organization: req.user.organization });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: "Not found" });

    if (req.user.role !== "Admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient removed" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


