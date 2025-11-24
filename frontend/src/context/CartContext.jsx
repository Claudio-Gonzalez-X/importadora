// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2'; 
// import products from '../data/products'; // OPCIONAL: Si ya no usas el archivo local, puedes borrar esta línea.

// 1. Crear y Exportar el Contexto
export const CartContext = createContext();

// Función de utilidad para formatear precio
const formatearPrecio = (precio) => {
  if (isNaN(precio)) return '$0';
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(precio);
};

// 2. Crear el Proveedor del Contexto
export const CartProvider = ({ children }) => {
  // Inicializar el carrito desde localStorage
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      return [];
    }
  });
  
  // Sincronizar con localStorage en cada cambio
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
  
  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
      // Agregar nuevo producto (asegura que 'quantity' sea parte del objeto)
      setCart([...cart, { ...product, quantity }]);
    }
    
    // Notificación SweetAlert2
    // ⚠️ CORREGIDO: Ahora usa 'product.name' para la alerta
    Swal.fire({
      position: 'top-end',
      title: '¡Agregado!',
      text: `${product.name} añadido al carrito.`,
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

  // CRUD: Update Quantity (Lógica separada)
  const updateItemQuantity = (itemId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        // Si la cantidad es 0 o menos, eliminamos el ítem
        return prevCart.filter(item => item.id !== itemId);
      } else {
        // Si no, actualizamos la cantidad
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
    agregarAlCarrito,
    addItem: agregarAlCarrito,      // Alias para tests o compatibilidad
    eliminarDelCarrito,
    removeItem: eliminarDelCarrito, // Alias para tests o compatibilidad
    updateItemQuantity,
    limpiarCarrito,
    getTotalItems,
    getTotalPrice,
    formatearPrecio,
    // products, // Ya no es necesario exponer la lista estática si usas Supabase
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