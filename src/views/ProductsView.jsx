import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext'; 
import ProductCard from '../components/ProductCard';

const ProductsView = () => {
  const { products } = useCart(); 

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');

  const categories = useMemo(() => {
    const allCategories = products.map(p => p.categoria);
    return ['Todos', ...new Set(allCategories)].sort();
  }, [products]);

  // Lógica de filtrado migrada de app.js
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'Todos' || product.categoria === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Catálogo de Parlantes</h2>
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Filtros */}
        <aside className="md:w-1/4 p-4 bg-white rounded-xl shadow-lg h-fit sticky top-[100px]">
          {/* ... Implementación del filtro de búsqueda y categoría ... */}
          <div className="mb-6">
            <label htmlFor="buscar-productos" className="block text-gray-700 font-medium mb-2">Buscar Producto</label>
            <input
              type="text"
              id="buscar-productos"
              placeholder="Ej: JBL Flip 5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="filtro-categoria" className="block text-gray-700 font-medium mb-2">Categoría</label>
            <select
              id="filtro-categoria"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg bg-white appearance-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Listado de Productos */}
        <div className="md:w-3/4">
          <div className="products-grid"> {/* Clase 'products-grid' migrada de styles.css */}
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="md:col-span-3 text-center text-lg text-gray-500 p-10 bg-white rounded-lg shadow-inner">
                No se encontraron productos que coincidan con los filtros aplicados.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;