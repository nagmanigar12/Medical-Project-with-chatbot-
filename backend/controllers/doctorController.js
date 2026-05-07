import User from "../models/User.js";

export const getDoctors = async (req, res) => {
  try {
    const filter = { role: /doctor/i };
    if (req.user.role !== "Admin") {
      filter.organization = req.user.organization;
    }

    const doctors = await User.find(filter).select(
      "name email role organization department specialization experienceYears qualifications phone bio createdAt"
    );

    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
