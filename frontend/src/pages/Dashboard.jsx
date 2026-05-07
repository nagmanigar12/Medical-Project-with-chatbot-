/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { TrendingUp, AlertTriangle, Activity, Clock } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";

const data = [
  { name: "Mon", total: 12, critical: 2 },
  { name: "Tue", total: 15, critical: 4 },
  { name: "Wed", total: 10, critical: 1 },
  { name: "Thu", total: 22, critical: 6 },
  { name: "Fri", total: 18, critical: 3 },
  { name: "Sat", total: 8, critical: 1 },
  { name: "Sun", total: 11, critical: 2 },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [patientCount, setPatientCount] = useState(0);
  const [criticalCount, setCriticalCount] = useState(0);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/patients");
        setPatientCount(response.data.length);
        setCriticalCount(
          response.data.filter((p) => p.status === "Critical").length,
        );
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchStats();
    fetchDoctors();
  }, []);

  const stats = [
    {
      label: "Active Cases",
      value: patientCount,
      icon: Activity,
      change: "+2 since 08:00",
      color: "text-slate-600",
    },
    {
      label: "Critical Alerts",
      value: criticalCount,
      icon: AlertTriangle,
      change: "Needs attention",
      color: "text-red-500",
    },
    {
      label: "QA Score",
      value: "98.2%",
      icon: TrendingUp,
      change: "Stable",
      color: "text-indigo-500",
    },
    {
      label: "Transports",
      value: "142",
      icon: Clock,
      change: "MTD",
      color: "text-slate-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Good Morning, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-gray-500">Clinician Oversight Dashboard</p>
      </div>

      {/* Clinician Profile */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">
              Clinician Profile
            </p>
            <h2 className="text-xl font-semibold text-slate-900 mt-2">
              {user?.name || "Not signed in"}
            </h2>
          </div>
          <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xs text-slate-600">
            {user?.role || "Unknown Role"}
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {user?.organization && (
            <p className="text-sm text-slate-700">
              Organization: {user.organization}
            </p>
          )}
          {user?.department && (
            <p className="text-sm text-slate-700">
              Department: {user.department}
            </p>
          )}
          {user?.specialization && (
            <p className="text-sm text-slate-700">
              Specialization: {user.specialization}
            </p>
          )}
          {user?.experienceYears !== undefined &&
            user?.experienceYears !== null && (
              <p className="text-sm text-slate-700">
                Experience: {user.experienceYears} years
              </p>
            )}
          {user?.phone && (
            <p className="text-sm text-slate-700">Phone: {user.phone}</p>
          )}
          {user?.email && (
            <p className="text-sm text-slate-700">Email: {user.email}</p>
          )}
          {user?.qualifications?.length > 0 && (
            <p className="text-sm text-slate-700">
              Qualifications: {user.qualifications.join(", ")}
            </p>
          )}
          {user?.bio && (
            <p className="text-sm text-slate-700">Bio: {user.bio}</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-4 bg-white shadow rounded-xl">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <h2 className="text-xl font-semibold mt-2">{stat.value}</h2>
              <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Doctor Section */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Doctor Section
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Registered doctor profiles available in the system.
            </p>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
            {doctors.length} doctor(s)
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="rounded-3xl border border-slate-200 p-4"
              >
                <h4 className="text-base font-semibold text-slate-900">
                  {doctor.name}
                </h4>
                <p className="mt-2 text-sm text-slate-500">
                  {doctor.specialization || "General"}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Department: {doctor.department || "N/A"}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Experience: {doctor.experienceYears || "N/A"} yrs
                </p>
                {doctor.phone && (
                  <p className="mt-2 text-sm text-slate-500">
                    Phone: {doctor.phone}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-200 p-4 text-slate-500">
              No doctor profiles are available yet.
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Patient Volume Trend</h2>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#6366f1"
              fill="#c7d2fe"
            />
            <Area
              type="monotone"
              dataKey="critical"
              stroke="#ef4444"
              fill="#fecaca"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* AI Panel */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="font-semibold text-lg mb-2">AI Risk Analysis</h3>
          <p className="text-sm text-gray-600">
            Case #1029 shows high probability of septic shock. Recommend
            immediate lactate testing.
          </p>
          <button className="mt-3 text-indigo-600 text-sm">
            View AI Suggestions →
          </button>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <div className="flex justify-between">
            <h3 className="font-semibold">Smart Summary</h3>
            <span className="text-xs text-green-500">Real-time</span>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Patient presented with dyspnea, SpO2 88%. Oxygen administered. COPD
            history detected.
          </p>

          <div className="flex gap-2 mt-3">
            <button className="text-sm px-3 py-1 bg-gray-100 rounded">
              Edit
            </button>
            <button className="text-sm px-3 py-1 bg-indigo-600 text-white rounded">
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
