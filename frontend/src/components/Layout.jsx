import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  LayoutGrid,
  ShieldCheck,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ChatAssistant from "./ChatAssistant";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Patients", icon: Users, path: "/patients" },
    { label: "Doctors", icon: User, path: "/doctors" },
    { label: "Reports", icon: FileText, path: "/reports" },
    { label: "Workflow Builder", icon: LayoutGrid, path: "/workflow" },
    { label: "QA/QI Module", icon: ShieldCheck, path: "/qa" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6">MediSync</h1>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 p-2 rounded ${
                    location.pathname === item.path
                      ? "bg-indigo-600"
                      : "hover:bg-slate-700"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="rounded-2xl bg-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center text-lg font-bold text-white">
              {user?.name?.[0] || "C"}
            </div>
            <div>
              <p className="text-sm font-semibold">
                {user?.name || "Clinician"}
              </p>
              <p className="text-xs text-gray-300">{user?.role || "Doctor"}</p>
            </div>
          </div>
          {user?.organization && (
            <p className="mt-3 text-xs text-gray-400">{user.organization}</p>
          )}
          {user?.department && (
            <p className="mt-2 text-xs text-gray-400">
              Department: {user.department}
            </p>
          )}
          {user?.specialization && (
            <p className="mt-1 text-xs text-gray-400">
              Specialization: {user.specialization}
            </p>
          )}
          {user?.experienceYears !== undefined &&
            user?.experienceYears !== null && (
              <p className="mt-1 text-xs text-gray-400">
                Experience: {user.experienceYears} yrs
              </p>
            )}
          {user?.qualifications?.length > 0 && (
            <p className="mt-1 text-xs text-gray-400">
              Quals: {user.qualifications.join(", ")}
            </p>
          )}
          {user?.phone && (
            <p className="mt-1 text-xs text-gray-400">Phone: {user.phone}</p>
          )}
          {user?.bio && (
            <p className="mt-2 text-xs text-gray-400">{user.bio}</p>
          )}
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">
              Clinician Portal
            </p>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome, {user?.name?.split(" ")[0] || "Clinician"}
            </h1>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm border border-slate-200">
            <p className="text-xs text-slate-500">Signed in as</p>
            <p className="font-semibold text-slate-900">
              {user?.name || "Doctor"}
            </p>
            <p className="text-xs text-slate-500">{user?.role || "Doctor"}</p>
          </div>
        </div>

        {children}
        {/* Chat assistant is global inside authenticated layout */}
        <ChatAssistant />
      </div>
    </div>
  );
};

export default Layout;
