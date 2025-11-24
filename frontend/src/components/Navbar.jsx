import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userRole = user?.user_metadata?.role || "usuario";
  const totalItems = getTotalItems();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/img/logo.png" alt="Logo GonSeg" className="h-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Importadora GonSeg
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-400 transition">Inicio</Link>
            <Link to="/productos" className="hover:text-blue-400 transition">Catálogo</Link>

            {user && userRole === "admin" && (
              <Link to="/admin" className="hover:text-yellow-400 transition">Admin</Link>
            )}
            {user && userRole === "importador" && (
              <Link to="/panel" className="hover:text-green-400 transition">Mi Panel</Link>
            )}

            <Link to="/carrito" className="relative">
              <i className="fas fa-shopping-cart text-xl"></i>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {!user ? (
              <Link to="/login" className="hover:text-blue-400 transition">Ingresar</Link>
            ) : (
              <div className="flex items-center gap-4">
                {userRole === "usuario" && (
                  <span className="text-gray-200 truncate max-w-xs">{user.email}</span>
                )}
                <button onClick={handleLogout} className="hover:text-red-400 transition">
                  Salir
                </button>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
            >
              <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-800 px-4 py-4 space-y-2">
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="block hover:text-blue-400 transition">Inicio</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/productos" className="block hover:text-blue-400 transition">Catálogo</Link>

          {user && userRole === "admin" && (
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/admin" className="block hover:text-yellow-400 transition">Admin</Link>
          )}
          {user && userRole === "importador" && (
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/panel" className="block hover:text-green-400 transition">Mi Panel</Link>
          )}

          <Link onClick={() => setIsMobileMenuOpen(false)} to="/carrito" className="block hover:text-red-400 transition">
            Carrito ({totalItems})
          </Link>

          {!user ? (
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/login" className="block hover:text-blue-400 transition">Ingresar</Link>
          ) : (
            <div className="flex flex-col gap-2">
              {userRole === "usuario" && (
                <span className="text-gray-200 truncate">{user.email}</span>
              )}
              <button onClick={handleLogout} className="block text-left w-full hover:text-red-400 transition">
                Salir
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
