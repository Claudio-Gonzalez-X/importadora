import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import AdminProductModal from "../components/AdminProductModal";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/products";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleSaveProduct = async (product) => {
    try {
      const normalized = {
        ...product,
        price: parseFloat(product.price) || 0,
        stock: parseInt(product.stock) || 0,
        name: product.name || "⚠ Sin nombre",
        description: product.description || "⚠ Sin descripción",
        category: product.category || "⚠ Sin categoría",
        image: product.image || "/placeholder.jpg",
      };

      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, normalized);
        setProducts(products.map(p => (p.id === editingProduct.id ? updated : p)));
        Swal.fire("Éxito", "Producto actualizado", "success");
      } else {
        const newProduct = await addProduct(normalized);
        setProducts([...products, newProduct]);
        Swal.fire("Éxito", "Producto agregado", "success");
      }
      setEditingProduct(null);
      setModalOpen(false);
    } catch (error) {
      console.error("Error guardando producto:", error);
      Swal.fire("Error", "No se pudo guardar el producto", "error");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

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
      <p className="text-center text-gray-500 py-20">Cargando productos...</p>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Productos</h2>
        <button
          onClick={() => { setEditingProduct(null); setModalOpen(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <i className="fas fa-plus mr-2"></i>Agregar Producto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">No hay productos aún</p>
        ) : (
          products.map(p => {
            const imgSrc = p.image || "/placeholder.jpg";
            const name = p.name || "⚠ Sin nombre";
            const category = p.category || "⚠ Sin categoría";
            const price = p.price != null ? p.price : "⚠ Sin precio";
            const stock = p.stock != null ? p.stock : "⚠ Sin stock";

            return (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow text-center border border-gray-100">
                <img
                  src={imgSrc}
                  alt={name}
                  className="h-32 w-full object-contain mb-3 rounded border border-gray-200"
                />
                <h3 className="font-semibold text-gray-900">{name}</h3>
                <p className="text-gray-500">{category}</p>
                <p className="text-gray-600">${price} - Stock: {stock}</p>
                <div className="mt-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
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
