import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

// Componente para la Tarjeta de Categoría
const CategoryCard = ({ title, imgUrl, linkTo }) => (
  <Link to={linkTo} className="category-card relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <img 
      src={imgUrl} 
      alt={title} 
      className="w-full h-48 object-cover brightness-75 hover:brightness-100 transition-all duration-500"
    />
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{title}</h3>
    </div>
  </Link>
);


const HomeView = () => {
  const { products } = useCart();
  
  // Filtrar productos destacados (migrado de la lógica de index.html)
  const featuredProducts = products.filter(p => p.destacado);

  return (
    <>
      {/* Banner Principal (Migrado de index.html) */}
      <div className="hero-banner h-[400px] w-full bg-cover bg-center flex items-center" 
           style={{ backgroundImage: "url('/img/banner.jpg')" }}>
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-5xl font-extrabold mb-4 shadow-text">¡La Mejor Calidad de Sonido!</h1>
          <Link to="/parlantes" className="btn-primary inline-flex py-3 px-8 text-lg hover:scale-105">
            Ver Catálogo <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Productos Destacados</h2>
          <div className="products-grid"> 
            {featuredProducts.slice(0, 8).map(product => ( 
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
      
    </>
  );
};

export default HomeView;