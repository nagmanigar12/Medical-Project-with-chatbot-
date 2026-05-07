import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Key, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/utils';

const Login = () => {
  const [email, setEmail] = useState('doctor@hospital.com');
  const [password, setPassword] = useState('password123');
  const [otp, setOtp] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

      <div className="w-full max-w-md bg-slate-800 p-6 rounded-2xl shadow-lg space-y-5">

        <h1 className="text-2xl font-bold text-center">MediSync Login</h1>

        {/* Password-only login */}

        {/* Error */}
        {error && (
          <div className="text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@clinical.sync"
            className="w-full px-4 py-3 rounded-lg bg-slate-700 outline-none"
          />

          {/* Password OR OTP */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg bg-slate-700 outline-none"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 rounded-lg flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Login
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          New here?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;