import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "User" },
  organization: { type: String },
  department: { type: String },
  specialization: { type: String },
  experienceYears: { type: Number },
  qualifications: [{ type: String }],
  phone: { type: String },
  bio: { type: String },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre("save", async function() {
  // use function() to access `this`
  const user = this;
  if (!user.isModified || !user.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Compare password
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);


