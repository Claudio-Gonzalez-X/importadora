import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Importamos tus vistas
import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import CartView from './views/CartView';
import Navbar from './components/Navbar'; // Crearemos este componente en el paso 2

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* La Navbar va fuera de Routes para que se vea en todas las páginas */}
        <Navbar /> 
        
        <Routes>
          {/* Ruta para el Inicio */}
          <Route path="/" element={<HomeView />} />
          
          {/* Ruta para el Catálogo (Esta es la que te falta) */}
          <Route path="/productos" element={<ProductsView />} />
          
          {/* Ruta para el Carrito */}
          <Route path="/carrito" element={<CartView />} />
          
          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<div className="text-center py-20 text-2xl">404 - Página no encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;