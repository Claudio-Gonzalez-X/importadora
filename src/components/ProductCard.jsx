// src/components/ProductCard.jsx
import React from 'react';
import { useCart } from '../context/CartContext'; 

const ProductCard = ({ product }) => {
  const { agregarAlCarrito, formatearPrecio } = useCart();
  const { nombre, descripcion, precio, imagenUrl, categoria, destacado, stock } = product;
  
  const isSinStock = stock === 0;

  const handleAddToCart = () => {
    agregarAlCarrito(product, 1);
  };
  
  return (
    <div className="product-card"> {/* Clase migrada de styles.css */}
<div className="relative overflow-hidden">
    {/* Clase 'product-badge' migrada */}
    {product.destacado && (
      <span className="product-badge absolute top-3 left-3">Destacado</span>
    )}
        {isSinStock && (
          <span className="product-badge bg-red-500 absolute top-3 left-3">Sin Stock</span>
        )}
        
        <img 
          src={imagenUrl} 
          alt={nombre} 
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="product-details"> {/* Clase 'product-details' migrada */}
        <p className="product-category">{categoria}</p>
        <h3 className="product-title">{nombre}</h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-2">{descripcion}</p>
        
        <p className="product-price">
          {formatearPrecio(precio)} {/* Utiliza la función del Contexto */}
        </p>
        
        <button 
          onClick={handleAddToCart}
          disabled={isSinStock}
          className={`btn ${isSinStock ? 'bg-gray-400 text-white cursor-not-allowed' : 'btn-primary'}`}
        >
          {isSinStock ? (
            <span>Sin Stock</span>
          ) : (
            <>
              <i className="fas fa-shopping-cart"></i>
              <span>Agregar al Carrito</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;