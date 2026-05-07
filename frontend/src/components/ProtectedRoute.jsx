import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from './Layout';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Initializing Clinical Environment...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If children are supplied (the common usage in App.jsx), render them.
  // Otherwise support nested routes via <Outlet />.
  return (
    <Layout>
      {children ? children : <Outlet />}
    </Layout>
  );
};

export default ProtectedRoute;