import React from 'react';
import { useCart } from '../context/CartContext'; 

const ProductCard = ({ product }) => {
  const { agregarAlCarrito, formatearPrecio } = useCart();
  
  // DESESTRUCTURACIÓN CON NOMBRES EN INGLÉS (Database)
  const { 
    name, 
    description, 
    price, 
    image, 
    category, 
    featured, 
    stock 
  } = product;
  
  const isSinStock = stock === 0;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative overflow-hidden h-48">
        {featured && (
          <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-sm">Destacado</span>
        )}
        {isSinStock && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-sm">Agotado</span>
        )}
        
        <img 
          src={image || 'https://via.placeholder.com/300'} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{category}</p>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">{description}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xl font-extrabold text-gray-800">
            {formatearPrecio(price)}
          </span>
          
          <button 
            onClick={() => agregarAlCarrito(product, 1)}
            disabled={isSinStock}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
              isSinStock 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isSinStock ? 'Sin Stock' : (
              <>
                <i className="fas fa-cart-plus"></i> Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;