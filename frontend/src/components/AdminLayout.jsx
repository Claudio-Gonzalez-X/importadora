import React from "react";
import { useAuth } from "../context/AuthContext";

const AdminLayout = ({ children }) => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Cargando sesión...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 font-bold">
        No autorizado
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-primary-900 text-white w-64 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Panel Admin</h1>
        <p className="mb-4">Hola, {user.email}</p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
