import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthLanding = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <div className="w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 p-10 shadow-2xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div>
                <p className="text-sm uppercase tracking-[0.4em] text-indigo-400">MediSync</p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight">
                Clinical workflow automation made simple.
              </h1>
              <p className="mt-4 text-slate-300">
                Get started with secure login or create a new account to manage patients, workflows, and QA in one place.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Link
                to="/register?role=DOCTOR"
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Register as Clinician
              </Link>
              <Link
                to="/register?role=PATIENT"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 px-6 py-4 text-center text-sm font-semibold text-white transition hover:border-indigo-400 hover:text-indigo-300"
              >
                Register as Patient
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 px-6 py-4 text-center text-sm font-semibold text-white transition hover:border-indigo-400 hover:text-indigo-300"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 p-8 shadow-inner ring-1 ring-slate-800">
            <h2 className="text-xl font-semibold text-white">Need help signing in?</h2>
            <p className="mt-3 text-slate-400">
              Use your registered hospital email and password, or register a new account if you are joining for the first time.
            </p>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <p>
                <span className="font-semibold text-white">Doctor:</span> Access patients and workflows.
              </p>
              <p>
                <span className="font-semibold text-white">QA Officer:</span> Review clinical QA items.
              </p>
              <p>
                <span className="font-semibold text-white">Staff:</span> Support incident and patient management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLanding;
