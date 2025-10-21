import React from 'react';
import { useCart } from '../context/CartContext'; 
import { Link } from 'react-router-dom'; 

const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="navbar fixed w-full z-50 transition-all duration-300"> {/* Clase 'navbar' migrada de styles.css */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Importadora GonSeg
        </Link>

        {/* MENÚ PRINCIPAL (Migrado del index.html original) */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/parlantes" className="nav-link">Productos</Link>
          <Link to="/ofertas" className="nav-link">Ofertas</Link>
          <Link to="/nosotros" className="nav-link">Nosotros</Link>
        </nav>

        {/* ICONOS DERECHA */}
        <div className="flex items-center space-x-4">
          
          {/* Contador del Carrito (Lógica migrada de app.js) */}
          <Link to="/carrito" className="p-2 relative">
            <i className="fas fa-shopping-cart text-xl"></i>
            {totalItems > 0 && (
              <span 
                id="cart-counter" 
                className="cart-badge"> {/* Clase 'cart-badge' migrada de styles.css */}
                {totalItems}
              </span>
            )}
          </Link>

          {/* Icono de Usuario */}
          <Link to="/login" className="p-2 relative">
            <i className="fas fa-user-circle text-xl"></i>
          </Link>
        </div>
        {/* Aquí iría el botón para el menú móvil */}
      </div>
    </header>
  );
};

export default Header;