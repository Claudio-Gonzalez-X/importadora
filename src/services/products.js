import { supabase } from "../supabaseClient";

// Normaliza la URL de la imagen para que siempre sea relativa desde /
const normalizeImage = (image) => {
  if (!image) return "/placeholder.jpg"; // placeholder visible
  return image.startsWith("http") ? image : `/${image.replace(/^\/+/, "")}`;
};

// Obtener todos los productos
export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  console.log("Fetch products:", data);
  return data.map(p => ({
    ...p,
    image: normalizeImage(p.image),
    name: p.name || "Sin nombre",
    price: p.price != null ? p.price : 0,
    stock: p.stock != null ? p.stock : 0,
    category: p.category || "Sin categoría",
  }));
};

// Agregar producto
export const addProduct = async (product) => {
  const productToInsert = { ...product, image: normalizeImage(product.image) };
  const { data, error } = await supabase.from("products").insert([productToInsert]).select();
  if (error) throw error;
  return data[0];
};

// Actualizar producto
export const updateProduct = async (id, product) => {
  const productToUpdate = { ...product, image: normalizeImage(product.image) };
  const { data, error } = await supabase.from("products").update(productToUpdate).eq("id", id).select();
  if (error) throw error;
  return data[0];
};

// Eliminar producto
export const deleteProduct = async (id) => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
};

/**
 * NUEVA FUNCIÓN: Obtiene una lista de categorías únicas de la tabla products.
 * @returns {Array<string>} Lista de nombres de categorías.
 */
export const getUniqueCategories = async () => {
    try {
        // Consulta Supabase para seleccionar valores distintos de la columna 'category'.
        const { data, error } = await supabase
            .from('products')
            .select('category', { distinct: true })
            .not('category', 'is', null); // Excluye categorías nulas

        if (error) throw error;

        // Mapea los objetos [{ category: 'X' }] a un array simple ['X', 'Y']
        const categories = data.map(item => item.category).filter(Boolean);
        
        return categories;
    } catch (err) {
        console.error("Error al obtener categorías únicas:", err);
        return [];
    }
};