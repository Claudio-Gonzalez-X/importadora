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
