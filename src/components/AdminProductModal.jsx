import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, getUniqueCategories } from '../services/products'; 
import Swal from 'sweetalert2'; 

const AdminProductModal = ({ productToEdit, onClose, onSave, isOpen }) => {
    const isEditMode = !!productToEdit;
    
    // 1. LLAMADA A TODOS LOS HOOKS PRIMERO (Esto debe ir antes del return condicional)
    const [formData, setFormData] = useState({ 
        name: productToEdit?.name || '',
        price: productToEdit?.price || 0,
        stock: productToEdit?.stock || 0,
        category: productToEdit?.category || '', 
        image: productToEdit?.image || '',
        description: productToEdit?.description || '',
    });
    
    const [availableCategories, setAvailableCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 2. useEffect también debe ir antes
    useEffect(() => {
        const loadCategories = async () => {
            const categories = await getUniqueCategories();
            setAvailableCategories(categories);
        };
        loadCategories();
    }, [isOpen]); // Añadir isOpen a las dependencias por si el modal se abre/cierra

    // **CORRECCIÓN CLAVE:** El return condicional va AQUÍ, después de todos los Hooks
    if (!isOpen) {
        return null;
    }

    // Manejador genérico de cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        
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

            onClose(); 
            onSave(); 
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