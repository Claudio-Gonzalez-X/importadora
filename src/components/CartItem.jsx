import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  // 1. Usamos los nombres correctos del Contexto
  const { eliminarDelCarrito, updateItemQuantity, formatearPrecio } = useCart();
  
  // 2. Desestructuramos usando 'quantity' (inglés) en lugar de 'cantidad'
  const { id, name, price, image, quantity } = item;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 bg-white rounded-lg shadow-sm mb-4 gap-4">
      
      {/* Imagen y Nombre */}
      <div className="flex items-center space-x-4 flex-1 w-full">
        <img 
          src={image || 'https://via.placeholder.com/150'} 
          alt={name} 
          className="w-20 h-20 object-cover rounded-md border border-gray-100" 
        />
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
          <p className="text-gray-500 text-sm">Unitario: {formatearPrecio(price)}</p>
        </div>
      </div>

      {/* Controles de Cantidad */}
      <div className="flex items-center space-x-3 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
        <button 
          // 3. Usamos 'updateItemQuantity' y 'quantity'
          onClick={() => updateItemQuantity(id, quantity - 1)}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 font-bold transition-colors"
        >
          -
        </button>
        <span className="font-semibold w-6 text-center text-gray-800">{quantity}</span>
        <button 
          onClick={() => updateItemQuantity(id, quantity + 1)}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 font-bold transition-colors"
        >
          +
        </button>
      </div>

      {/* Subtotal y Eliminar */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
        <p className="font-bold text-lg text-blue-600 min-w-[100px] text-right">
          {formatearPrecio(price * quantity)}
        </p>
        <button 
          onClick={() => eliminarDelCarrito(id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
          title="Eliminar producto"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;