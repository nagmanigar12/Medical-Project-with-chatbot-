import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
    role: "DOCTOR",
    department: "",
    specialization: "",
    experienceYears: "",
    qualifications: "",
    phone: "",
    bio: "",
  });

  const [error, setError] = useState(null);

  const { register, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const r = params.get("role");
    if (r) setFormData((s) => ({ ...s, role: r }));
  }, [location.search]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(formData);
      await login(formData.email, formData.password);
      if (formData.role === "PATIENT") navigate("/patient-dashboard");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration or login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl space-y-5">
        <h1 className="text-2xl font-bold text-center">Signup</h1>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          />
          <input
            name="organization"
            placeholder="Organization"
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          />

          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full p-3 rounded bg-slate-700"
          >
            <option value="ADMIN">Admin</option>
            <option value="DOCTOR">Doctor</option>
            <option value="PATIENT">Patient</option>
            <option value="PARAMEDIC">Staff</option>
            <option value="QA_OFFICER">QA Officer</option>
          </select>

          {formData.role === "DOCTOR" && (
            <>
              <input
                name="department"
                value={formData.department}
                placeholder="Department"
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
              />
              <input
                name="specialization"
                value={formData.specialization}
                placeholder="Specialization"
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
              />
              <input
                name="experienceYears"
                type="number"
                value={formData.experienceYears}
                placeholder="Years of Experience"
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
              />
              <input
                name="qualifications"
                value={formData.qualifications}
                placeholder="Qualifications (comma separated)"
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
              />
              <input
                name="phone"
                value={formData.phone}
                placeholder="Phone"
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
              />
              <textarea
                name="bio"
                value={formData.bio}
                placeholder="Profile summary"
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
              />
            </>
          )}

          <button className="w-full bg-indigo-600 py-3 rounded">
            Create account & Sign in
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
