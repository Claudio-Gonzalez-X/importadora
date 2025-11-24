import React from "react";
import { Navigate } from "react-router-dom";
import useAuthState from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, role, loading } = useAuthState();

  if (loading) return <div className="p-10 text-center">Cargando...</div>;

  if (!user) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
