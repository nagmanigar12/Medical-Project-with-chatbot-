import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("medi_sync_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const userData = response.data;

      const newUser = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        organization: userData.organization,
        department: userData.department,
        specialization: userData.specialization,
        experienceYears: userData.experienceYears,
        qualifications: userData.qualifications,
        phone: userData.phone,
        bio: userData.bio,
        token: userData.token,
      };

      setUser(newUser);
      localStorage.setItem("medi_sync_user", JSON.stringify(newUser));
    } catch (error) {
      throw new Error(error?.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/register", data);
      const userData = response.data;

      const newUser = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        organization: userData.organization,
        department: userData.department,
        specialization: userData.specialization,
        experienceYears: userData.experienceYears,
        qualifications: userData.qualifications,
        phone: userData.phone,
        bio: userData.bio,
        token: userData.token,
      };

      setUser(newUser);
      localStorage.setItem("medi_sync_user", JSON.stringify(newUser));
    } catch (error) {
      throw new Error(error?.response?.data?.error || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // OTP endpoints are supported on the API but the app uses password-based auth only.

  const logout = () => {
    setUser(null);
    localStorage.removeItem("medi_sync_user");
  };

  const hasRole = (roles) => {
    return user ? roles.includes(user.role) : false;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
