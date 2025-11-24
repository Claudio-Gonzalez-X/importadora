import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Importamos conexión a Supabase
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
  // 1. Estado local para destacados
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Cargar productos destacados desde Supabase
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Consultamos productos donde la columna 'featured' es true
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true) // Filtrar por destacado
          .limit(4); // Opcional: Traer solo 4 para el home

        if (error) throw error;
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error cargando destacados:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <>
      {/* Banner Principal */}
      <div className="hero-banner h-[400px] w-full bg-cover bg-center flex items-center" 
           style={{ backgroundImage: "url('/img/banner.jpg')" }}>
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-5xl font-extrabold mb-4 shadow-text">¡La Mejor Calidad de Sonido!</h1>
          {/* Enlace de ejemplo a una categoría */}
          <Link to="/productos" className="btn-primary inline-flex py-3 px-8 text-lg hover:scale-105 bg-blue-600 text-white rounded-lg">
            Ver Catálogo <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Productos Destacados</h2>
          
          {loading ? (
            <div className="text-center py-10">Cargando destacados...</div>
          ) : (
            // Usamos grid para mostrar las tarjetas
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> 
              {featuredProducts.map(product => ( 
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
        
        {/* Sección de Categorías (Opcional, usando el componente de arriba) */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Asegúrate de que estas imágenes existan en public/img */}
            <CategoryCard title="Parlantes" imgUrl="/img/jblcharge.jpg" linkTo="/productos" />
            <CategoryCard title="Cámaras" imgUrl="/img/sony-alpha.png" linkTo="/productos" />
            <CategoryCard title="Pendrives" imgUrl="/img/pendrive1.jpg" linkTo="/productos" />
          </div>
        </section>

      </div>
    </>
  );
};

export default HomeView;