// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <p className="text-sm text-gray-400">Dirección: Av. Las Condes #1234</p>
            <p className="text-sm text-gray-400">Teléfono: +56 9 1234 5678</p>
            <p className="text-sm text-gray-400">Email: info@gonseg.cl</p>
          </div>
          
          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul>
              <li><Link to="/" className="text-sm text-gray-400 hover:text-primary-400">Home</Link></li>
              <li><Link to="/parlantes" className="text-sm text-gray-400 hover:text-primary-400">Productos</Link></li>
              <li><Link to="/carrito" className="text-sm text-gray-400 hover:text-primary-400">Carrito</Link></li>
              <li><Link to="/login" className="text-sm text-gray-400 hover:text-primary-400">Login</Link></li>
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary-400">Términos y Condiciones</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary-400">Política de Privacidad</a></li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-primary-400 text-xl"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-xl"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-xl"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 py-4 text-center">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Importadora GonSeg. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;