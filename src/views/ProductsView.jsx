import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient'; // Asegúrate de tener este archivo creado
import ProductCard from '../components/ProductCard';

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');

  // 1. Cargar productos desde Supabase al iniciar
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) throw error;
        setProducts(data);
      } catch (error) {
        console.error('Error cargando productos:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. Calcular categorías disponibles (usando la propiedad 'category' en inglés)
  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category);
    return ['Todos', ...new Set(allCategories)].sort();
  }, [products]);

  // 3. Filtrar productos (usando propiedades en inglés: name, description, category)
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'Todos' || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="text-center p-10 text-xl text-gray-600">Cargando catálogo...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Catálogo de Productos</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Barra Lateral de Filtros */}
        <aside className="md:w-1/4 p-6 bg-white rounded-xl shadow-md h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-4 text-gray-700">Filtros</h3>
          
          <div className="mb-6">
            <label htmlFor="buscar-productos" className="block text-gray-600 font-medium mb-2">Buscar</label>
            <input
              type="text"
              id="buscar-productos"
              placeholder="Ej: JBL, Sony..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="filtro-categoria" className="block text-gray-600 font-medium mb-2">Categoría</label>
            <select
              id="filtro-categoria"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 outline-none transition cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Rejilla de Productos */}
        <div className="md:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl shadow-inner">
              <p className="text-gray-500 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsView;