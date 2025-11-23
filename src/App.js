import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import HomeView from "./views/HomeView";
import ProductsView from "./views/ProductsView";
import CartView from "./views/CartView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";

import AdminDashboard from "./views/AdminDashboard";
import ImportadorDashboard from "./views/ImportadorDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            {/* Páginas públicas */}
            <Route path="/" element={<HomeView />} />
            <Route path="/productos" element={<ProductsView />} />
            <Route path="/carrito" element={<CartView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/registro" element={<RegisterView />} />

            {/* Rutas protegidas */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/panel"
              element={
                <ProtectedRoute allowedRoles={["importador"]}>
                  <ImportadorDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="p-20 text-center text-3xl font-bold text-gray-700">
                  404 | Página no encontrada
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
