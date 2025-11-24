import { supabase } from "../supabaseClient";

/**
 * Devuelve la URL pública de una imagen almacenada en Supabase Storage
 * @param {string} image Nombre del archivo o URL completa
 * @returns {string} URL para mostrar en frontend
 */
const getImageUrl = (image) => {
  if (!image) return "/placeholder.jpg"; // placeholder visible
  if (image.startsWith("http")) return image; // ya es URL completa
  // Cambia 'productos' por tu bucket
  return supabase
    .storage
    .from("productos")
    .getPublicUrl(image)
    .data.publicUrl;
};

// Obtener todos los productos
export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;

  return (data || []).map((p) => ({
    ...p,
    image: getImageUrl(p.image),
    name: p.name || "⚠ Sin nombre",
    price: p.price != null ? p.price : 0,
    stock: p.stock != null ? p.stock : 0,
    category: p.category || "⚠ Sin categoría",
    description: p.description || "⚠ Sin descripción",
  }));
};

// Agregar producto
export const addProduct = async (product) => {
  const productToInsert = { ...product, image: product.image || null };
  const { data, error } = await supabase
    .from("products")
    .insert([productToInsert])
    .select();
  if (error) throw error;

  return {
    ...data[0],
    image: getImageUrl(data[0].image),
  };
};

// Actualizar producto
export const updateProduct = async (id, product) => {
  const productToUpdate = { ...product, image: product.image || null };
  const { data, error } = await supabase
    .from("products")
    .update(productToUpdate)
    .eq("id", id)
    .select();
  if (error) throw error;

  return {
    ...data[0],
    image: getImageUrl(data[0].image),
  };
};

// Eliminar producto
export const deleteProduct = async (id) => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
};

// Obtener categorías únicas
export const getUniqueCategories = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("category", { distinct: true })
    .not("category", "is", null);
  if (error) return [];
  return data.map((item) => item.category).filter(Boolean);
};


/**
 * Obtiene métricas clave de inventario y la lista de productos con stock bajo.
 * @returns {object} { criticalStock: Array, totalInventoryValue: number, totalProducts: number }
 */
export const getInventoryReport = async () => {
    try {
        // 1. Obtener todos los productos para cálculos del lado del cliente
        const { data: allProducts, error } = await supabase
            .from('products')
            .select('id, name, price, stock, category')
            .not('stock', 'is', null); // Asegurarse de que stock no sea nulo

        if (error) throw error;
        if (!allProducts) return { criticalStock: [], totalInventoryValue: 0, totalProducts: 0 };

        const LOW_STOCK_THRESHOLD = 5; // Umbral crítico

        // 2. Reporte de Inventario Crítico (Reporte 1)
        const criticalStock = allProducts.filter(p => p.stock <= LOW_STOCK_THRESHOLD);

        // 3. Reporte de Valor Total del Inventario (Reporte 2)
        const totalInventoryValue = allProducts.reduce((sum, p) => {
            return sum + (p.price * p.stock);
        }, 0);

        // 4. Reporte de Conteo de Productos (Base para Reporte 3)
        const totalProducts = allProducts.length;

        return {
            criticalStock,
            totalInventoryValue,
            totalProducts,
        };

    } catch (err) {
        console.error("Error al obtener el reporte de inventario:", err);
        throw new Error("No se pudo generar el reporte de inventario.");
    }
};