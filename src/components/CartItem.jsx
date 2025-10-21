// src/components/CartItem.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { eliminarDelCarrito, formatearPrecio, agregarAlCarrito } = useCart();
  const { id, nombre, precio, imagenUrl, quantity } = item;
  
  const handleQuantityChange = (delta) => {
    // Si la cantidad llega a 0 o menos, elimina el ítem
    if (quantity + delta <= 0) {
        eliminarDelCarrito(id);
    } else {
        // Usa agregarAlCarrito para simular la actualización de cantidad
        agregarAlCarrito(item, delta); 
    }
  };

  return (
    <div className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
      {/* Imagen y Nombre */}
      <div className="flex items-center w-1/2">
        <img src={imagenUrl} alt={nombre} className="w-16 h-16 object-cover rounded-md mr-4" />
        <span className="font-medium text-gray-800">{nombre}</span>
      </div>

      {/* Precio Unitario */}
      <div className="w-1/6 text-center text-gray-600">
        {formatearPrecio(precio)}
      </div>

      {/* Cantidad con Controles */}
      <div className="w-1/6 flex justify-center items-center">
        <button 
          onClick={() => handleQuantityChange(-1)}
          className="btn-outline w-8 h-8 flex items-center justify-center text-sm"
        >
          -
        </button>
        <span className="mx-3 w-6 text-center">{quantity}</span>
        <button 
          onClick={() => handleQuantityChange(1)}
          className="btn-outline w-8 h-8 flex items-center justify-center text-sm"
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="w-1/6 text-right font-semibold text-gray-800">
        {formatearPrecio(precio * quantity)}
      </div>

      {/* Eliminar */}
      <div className="w-auto ml-4">
        <button 
          onClick={() => eliminarDelCarrito(id)}
          className="text-red-500 hover:text-red-700"
          title="Eliminar producto"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;