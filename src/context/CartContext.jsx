// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2'; 
import products from '../data/products'; // Importar la lista de productos

// 1. Crear y Exportar el Contexto
export const CartContext = createContext();

// Función de utilidad para formatear precio (migrada de app.js)
const formatearPrecio = (precio) => {
  // Manejo de NaN
  if (isNaN(precio)) return '$0';
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(precio);
};

// 2. Crear el Proveedor del Contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const updateItemQuantity = (itemId, newQuantity) => {
  setCart(prevCart => {
    if (newQuantity <= 0) {
      // DELETE: Si la cantidad es 0 o menos, eliminamos el ítem (Requerido por Test 6)
      return prevCart.filter(item => item.id !== itemId);
    } else {
      // UPDATE: Actualiza la cantidad (Requerido por Test 4)
      return prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      );
    }
  });
};
    
    // Inicializar el carrito con lo que hay en localStorage
    try {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error("Error al cargar el carrito:", error);
        return [];
    }
  });
  
  // Sincronizar con localStorage en cada cambio de carrito
  useEffect(() => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error("Error al guardar el carrito:", error);
    }
  }, [cart]);

  // Función para obtener el total de ítems
  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };
  
  // Función para obtener el subtotal (valor numérico)
  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
  };

  // CRUD: Create/Update
  const agregarAlCarrito = (product, quantity = 1) => {
    const itemIndex = cart.findIndex(item => item.id === product.id);

    if (itemIndex > -1) {
      // Actualizar la cantidad (si ya existe)
      const newCart = [...cart];
      newCart[itemIndex].quantity += quantity;
      setCart(newCart);
    } else {
      // Agregar nuevo producto
      setCart([...cart, { ...product, quantity }]);
    }
    
    // Notificación SweetAlert2 (migrada de app.js)
    Swal.fire({
      position: 'top-end',
      title: '¡Agregado!',
      text: `${product.nombre} añadido al carrito.`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      background: '#10b981',
      color: 'white',
      iconColor: 'white'
    });
  };

  // CRUD: Delete
  const eliminarDelCarrito = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };
  
  // CRUD: Delete All
  const limpiarCarrito = () => {
    setCart([]);
  };
  const updateItemQuantity = (itemId, newQuantity) => {
  setCart(prevCart => {
    if (newQuantity <= 0) {
      // DELETE: Si la cantidad es 0 o menos, eliminamos el ítem (Requerido por Test 6)
      return prevCart.filter(item => item.id !== itemId);
    } else {
      // UPDATE: Actualiza la cantidad (Requerido por Test 4)
      return prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      );
    }
  });
};
  const contextValue = {
    cart,
    agregarAlCarrito,             // Nombre usado por tus componentes (Ej: handleAddToCart)
    addItem: agregarAlCarrito,         // Test 2 y 3 esperan 'addItem'
    eliminarDelCarrito,           // Nombre original de la app
    removeItem: eliminarDelCarrito,   // Test 5 espera 'removeItem'
    updateItemQuantity,                // Test 4 y 6 esperan 'updateItemQuantity'
    limpiarCarrito,
    getTotalItems,
    getTotalPrice,
    formatearPrecio,
    products, 
  };

 return (
  <CartContext.Provider value={contextValue}>
    {children}
  </CartContext.Provider>
 ); 
};

// 3. Hook personalizado
export const useCart = () => {
  return useContext(CartContext);
};