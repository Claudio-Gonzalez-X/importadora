import React from "react";

const AdminHeader = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm flex items-center justify-between px-6 py-4">
      <button
        className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>
      <h2 className="text-xl font-bold text-gray-900">Panel de Administración</h2>
    </header>
  );
};

export default AdminHeader;
