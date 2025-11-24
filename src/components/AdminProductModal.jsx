import React, { useState, useEffect } from 'react';
// Importa TODAS las funciones de servicio, incluyendo la nueva
import { addProduct, updateProduct, getUniqueCategories } from '../services/products'; 
import Swal from 'sweetalert2'; // Asumo que usas SweetAlert2 para mensajes

const AdminProductModal = ({ productToEdit, onClose, onSave }) => {
    const isEditMode = !!productToEdit;
    
    // 1. Estado inicial del formulario
    const [formData, setFormData] = useState({ 
        name: productToEdit?.name || '',
        price: productToEdit?.price || 0,
        stock: productToEdit?.stock || 0,
        category: productToEdit?.category || '', // Campo clave
        image: productToEdit?.image || '',
        description: productToEdit?.description || '',
    });
    
    // 2. Estado para almacenar la lista de categorías existentes
    const [availableCategories, setAvailableCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 3. Efecto para cargar las categorías disponibles (USANDO EL NUEVO SERVICIO)
    useEffect(() => {
        const loadCategories = async () => {
            const categories = await getUniqueCategories();
            setAvailableCategories(categories);
        };
        loadCategories();
    }, []);

    // Manejador genérico de cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Asegúrate de convertir price y stock a número si no son cadenas vacías
        const newValue = (name === 'price' || name === 'stock') ? parseFloat(value) : value;

        setFormData(prev => ({ 
            ...prev, 
            [name]: newValue || (name === 'price' || name === 'stock' ? 0 : value)
        }));
    };

    // Manejador del guardado
    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            let result;
            if (isEditMode) {
                result = await updateProduct(productToEdit.id, formData);
            } else {
                result = await addProduct(formData);
            }
            
            Swal.fire({
                icon: 'success',
                title: '¡Guardado!',
                text: `El producto "${result.name}" se guardó exitosamente.`,
                timer: 2000,
                showConfirmButton: false
            });

            onSave(); // Llama a la función para cerrar el modal y refrescar la vista
        } catch (err) {
            console.error("Error al guardar producto:", err);
            setError(err.message || "Error desconocido al guardar el producto.");
            Swal.fire({
                icon: 'error',
                title: 'Error de Guardado',
                text: err.message || "Verifica los datos e intenta nuevamente.",
            });
        } finally {
            setLoading(false);
        }
    };
    
    return (
        // Estilos básicos de modal (Ajustar a tus estilos de Tailwind/CSS)
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    {isEditMode ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                </h3>
                
                {error && <p className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4">{error}</p>}

                <form onSubmit={handleSave}>
                    {/* CAMPO: Nombre */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg" required />
                    </div>

                    {/* CAMPO CLAVE: Categoría (Input + Datalist) */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            list="category-options"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Selecciona o escribe una nueva categoría"
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                        {/* Datalist: Opciones que aparecen al escribir */}
                        <datalist id="category-options">
                            {availableCategories.map(cat => (
                                <option key={cat} value={cat} /> 
                            ))}
                        </datalist>
                    </div>

                    {/* CAMPO: Precio */}
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg" required min="0" />
                    </div>

                    {/* CAMPO: Stock */}
                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                        <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg" required min="0" />
                    </div>
                    
                    {/* CAMPO: URL Imagen */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">URL Imagen</label>
                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg" placeholder="ej: /img/producto.jpg" />
                    </div>

                    {/* CAMPO: Descripción */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border border-gray-300 p-2 rounded-lg"></textarea>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition disabled:bg-indigo-400">
                            {loading ? 'Guardando...' : 'Guardar Producto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductModal;