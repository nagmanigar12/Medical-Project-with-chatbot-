import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "30d",
  });
};

const otpStore = new Map();

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(email, { otp, expires });

    // In a real app, send this via email. For now, log it.
    console.log(`[AUTH] OTP for ${email}: ${otp}`);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const record = otpStore.get(email);
    if (!record) {
      return res.status(400).json({ error: "OTP not found or expired" });
    }

    if (Date.now() > record.expires) {
      otpStore.delete(email);
      return res.status(400).json({ error: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // OTP is valid. Clear it.
    otpStore.delete(email);

    let user = await User.findOne({ email });
    
    // If user doesn't exist, we might want to return an error or allow registration via OTP.
    // The user's request said "register or signin page update krdo", usually implying login via OTP.
    if (!user) {
      return res.status(404).json({ error: "User not found. Please register first." });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization: user.organization,
      department: user.department,
      specialization: user.specialization,
      experienceYears: user.experienceYears,
      qualifications: user.qualifications,
      phone: user.phone,
      bio: user.bio,
      token: generateToken(user._id.toString())
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during OTP verification" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, organization, department, specialization, experienceYears, qualifications, phone, bio } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const qualificationArray = Array.isArray(qualifications)
      ? qualifications
      : (qualifications || "").split(",").map((q) => q.trim()).filter(Boolean);

    const user = await User.create({
      name,
      email,
      password,
      role,
      organization,
      department,
      specialization,
      experienceYears,
      qualifications: qualificationArray,
      phone,
      bio
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization: user.organization,
      department: user.department,
      specialization: user.specialization,
      experienceYears: user.experienceYears,
      qualifications: user.qualifications,
      phone: user.phone,
      bio: user.bio,
      token: generateToken(user._id.toString())
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        department: user.department,
        specialization: user.specialization,
        experienceYears: user.experienceYears,
        qualifications: user.qualifications,
        phone: user.phone,
        bio: user.bio,
        token: generateToken(user._id.toString())
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


