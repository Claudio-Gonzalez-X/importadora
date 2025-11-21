import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                <i className="fas fa-store mr-2 text-blue-500"></i>Importadora GonSeg
              </span>
            </Link>
          </div>

          {/* Enlaces de Escritorio */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-blue-400 transition">Inicio</Link>
            <Link to="/productos" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-blue-400 transition">Catálogo</Link>
            
            {/* Botón del Carrito */}
            <Link to="/carrito" className="relative p-2 text-gray-300 hover:text-white group">
              <i className="fas fa-shopping-cart text-xl group-hover:scale-110 transition-transform"></i>
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>

          {/* Botón Menú Móvil */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil (Desplegable) */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              to="/productos" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Catálogo
            </Link>
            <Link 
              to="/carrito" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-shopping-cart mr-2"></i> Carrito ({getTotalItems()})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;