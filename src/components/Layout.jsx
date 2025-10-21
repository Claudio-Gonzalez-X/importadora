// src/components/Layout.jsx
import React from 'react';
import Header from './Header'; 
import Footer from './Footer'; 

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Contenido principal (las vistas HomeView, CartView, etc.) */}
      <main className="flex-grow pt-20"> {/* pt-20 para compensar la altura del Header fijo */}
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;