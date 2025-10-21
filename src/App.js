import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx'; 
import Layout from './components/Layout.jsx'; // Asumimos un Layout que envuelve Header y Footer
import HomeView from './views/HomeView.jsx';
import ProductsView from './views/ProductsView.jsx';
import CartView from './views/CartView.jsx';
import LoginView from './views/LoginView.jsx';

function App() {
  return (
    <BrowserRouter> 
      <CartProvider> {/* Envuelve la aplicación con el proveedor de carrito */}
        <Layout>
          <Routes>
            {/* Migración de index.html */}
            <Route path="/" element={<HomeView />} />
            {/* Migración de parlantes.html */}
            <Route path="/parlantes" element={<ProductsView />} />
            {/* Migración de carrito.html */}
            <Route path="/carrito" element={<CartView />} />
            {/* Migración de login.html */}
            <Route path="/login" element={<LoginView />} />
            <Route path="*" element={<div className="p-8 text-center"><h1>404 | Página no encontrada</h1></div>} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;