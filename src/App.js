import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import Layout from './components/Layout'; // Asumimos un Layout que envuelve Header y Footer
import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import CartView from './views/CartView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

function App() {
  return (
  <CartProvider>
    <BrowserRouter> 
        <Layout>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/parlantes" element={<ProductsView />} />
            <Route path="/camaras" element={<ProductsView />} />
            <Route path="/pendrives" element={<ProductsView />} />
            <Route path="/carrito" element={<CartView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/registro" element={<RegisterView />} />
            <Route path="*" element={<div className="p-8 text-center"><h1>404 | Página no encontrada</h1></div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

