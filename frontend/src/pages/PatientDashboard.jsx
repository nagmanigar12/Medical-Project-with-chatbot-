import React from 'react';
import { useAuth } from '../context/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.name || 'Patient'}</h1>
      <p className="text-gray-600 mt-2">This is your patient portal. From here you can view your profile, appointments, and care notes.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">My Profile</h3>
          <p className="text-sm text-gray-500 mt-2">Email: {user?.email}</p>
          <p className="text-sm text-gray-500">Organization: {user?.organization}</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Appointments</h3>
          <p className="text-sm text-gray-500 mt-2">No upcoming appointments.</p>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
