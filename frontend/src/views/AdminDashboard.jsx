import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import AdminProductModal from "../components/AdminProductModal";
// NOTA: Quitamos addProduct y updateProduct de aquí porque ya los usa el modal.
// Solo dejamos getProducts y deleteProduct que sí usa este archivo.
import { getProducts, deleteProduct } from "../services/products";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. Cargar Productos ---
  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (mounted) setProducts(data || []);
      } catch (error) {
        console.error("Error cargando productos:", error);
        Swal.fire("Error", "No se pudieron cargar los productos", "error");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => { mounted = false; };
  }, []);

  // --- 2. Guardar (Solo actualizar estado visual) ---
  // CORRECCIÓN: Esta función ya NO llama a la API ni muestra alertas.
  // Recibe el producto ya guardado desde el modal.
  const handleSaveProduct = (savedProduct) => {
    if (editingProduct) {
      // Si estábamos editando, buscamos el producto en la lista y lo reemplazamos
      setProducts(products.map(p => (p.id === savedProduct.id ? savedProduct : p)));
    } else {
      // Si es nuevo, lo agregamos al final de la lista actual
      setProducts([...products, savedProduct]);
    }
    
    // Cerramos el modal y limpiamos la selección
    setEditingProduct(null);
    setModalOpen(false);
  };

  // --- 3. Preparar Edición ---
  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  // --- 4. Eliminar ---
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
        Swal.fire("Eliminado", "Producto eliminado", "success");
      } catch (error) {
        console.error("Error eliminando producto:", error);
        Swal.fire("Error", "No se pudo eliminar el producto", "error");
      }
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-xl animate-pulse">Cargando productos...</p>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Panel de Productos</h2>
        <button
          onClick={() => { setEditingProduct(null); setModalOpen(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> Agregar Producto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No hay productos en el inventario.</p>
            <p className="text-gray-400 text-sm mt-2">Usa el botón "Agregar Producto" para comenzar.</p>
          </div>
        ) : (
          products.map(p => {
            // --- LÓGICA DE RUTAS DE IMAGEN ---
            let imgSrc = "/placeholder.jpg"; // Default inicial
            
            if (p.image) {
                // Si es externa (http) o ya tiene slash (/), la dejamos igual
                if (p.image.startsWith('http') || p.image.startsWith('/')) {
                    imgSrc = p.image;
                } else {
                    // Si es relativa "img/foto.jpg", le agregamos el slash "/img/foto.jpg"
                    imgSrc = `/${p.image}`;
                }
            }
            // ---------------------------------

            const name = p.name || "⚠ Sin nombre";
            const category = p.category || "⚠ Sin categoría";
            const price = p.price != null ? p.price : 0;
            const stock = p.stock != null ? p.stock : 0;

            return (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full">
                
                {/* Contenedor de imagen con altura fija */}
                <div className="h-40 w-full mb-4 bg-gray-50 rounded overflow-hidden flex items-center justify-center relative">
                    <img
                      src={imgSrc}
                      alt={name}
                      className="h-full w-full object-contain"
                      
                      // --- FIX INTELIGENTE DE IMÁGENES ---
                      onError={(e) => {
                        if (e.target.getAttribute('data-tried-local') === 'true') {
                            e.target.onerror = null; 
                            e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22150%22%20height%3D%22150%22%20viewBox%3D%220%200%20150%20150%22%3E%3Crect%20fill%3D%22%23eeeeee%22%20width%3D%22150%22%20height%3D%22150%22%2F%3E%3Ctext%20fill%3D%22%23aaaaaa%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20dy%3D%2210.5%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3ESin%20Imagen%3C%2Ftext%3E%3C%2Fsvg%3E";
                            return;
                        }
                        const filename = imgSrc.split('/').pop();
                        e.target.src = `/img/${filename}`;
                        e.target.setAttribute('data-tried-local', 'true');
                      }}
                    />
                </div>

                <h3 className="font-bold text-gray-800 text-lg mb-1 leading-tight line-clamp-1">{name}</h3>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">{category}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded">
                    <span>Stock: <strong className={stock < 5 ? "text-red-500" : "text-gray-800"}>{stock}</strong></span>
                    <span className="font-bold text-gray-900">${price.toLocaleString('es-CL')}</span>
                </div>

                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm font-medium transition-colors"
                  >
                    <i className="fas fa-edit mr-1"></i> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium transition-colors"
                  >
                    <i className="fas fa-trash-alt mr-1"></i> Eliminar
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <AdminProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;