import React from "react";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`bg-gradient-to-b from-primary-900 to-primary-800 text-white w-64 flex-shrink-0 flex flex-col h-screen fixed md:relative transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6 border-b border-primary-700">
        <h1 className="text-xl font-bold">Importadora GonSeg</h1>
        <p className="text-sm text-primary-200">Panel Admin</p>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        <a href="#" className="nav-item block px-4 py-3 rounded hover:bg-primary-700">
          Parlantes
        </a>
        <a href="#" className="nav-item block px-4 py-3 rounded hover:bg-primary-700">
          Cámaras
        </a>
        <a href="#" className="nav-item block px-4 py-3 rounded hover:bg-primary-700">
          Pendrives
        </a>
        <div className="border-t border-primary-700 my-4"></div>
        <a href="#" className="nav-item block px-4 py-3 rounded hover:bg-primary-700">
          Configuración
        </a>
      </nav>
      <div className="p-4 border-t border-primary-700">
        <p className="text-sm text-white">Admin@example.com</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
