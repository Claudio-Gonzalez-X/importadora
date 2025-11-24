import React, { useState, useEffect } from "react";
// Importamos el layout y la función de reporte
import AdminLayout from "../components/AdminLayout";
import { getInventoryReport } from "../services/products";
import { formatearPrecio } from "../context/CartContext"; // Asumo que formatearPrecio es globalmente accesible o lo importas de CartContext

// Función de utilidad para formatear precio (si no es accesible globalmente)
// Si ya la tienes en CartContext, puedes eliminar esta función auxiliar.
const formatPrice = (price) => {
    if (isNaN(price)) return '$0';
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(price);
};


const ImportadorDashboard = () => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar los reportes al montar
    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await getInventoryReport();
                setReportData(data);
                setError(null);
            } catch (err) {
                console.error("Error cargando reporte:", err);
                setError("No se pudieron cargar los datos del reporte.");
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, []);

    // 1. Mostrar estado de carga y error
    if (loading) {
        return (
            <AdminLayout>
                <div className="text-center py-20 text-gray-500">
                    Cargando reportes de inventario...
                </div>
            </AdminLayout>
        );
    }

    if (error) {
         return (
            <AdminLayout>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </AdminLayout>
        );
    }

    const { criticalStock, totalInventoryValue, totalProducts } = reportData;
    
    // 2. Reporte de Inventario Crítico (Umbral bajo definido en services/products.js)
    const LOW_STOCK_THRESHOLD = 5; 

    return (
        <AdminLayout>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                Reportes de Inventario y Gestión
            </h2>

            {/* Panel de Métricas Clave (Reporte 2 y 3) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <MetricCard 
                    title="Productos Totales" 
                    value={totalProducts} 
                    icon="fas fa-boxes" 
                    bgColor="bg-blue-500"
                />
                <MetricCard 
                    title="Valor Total de Stock" 
                    // Usamos formatPrice o formatearPrecio, dependiendo de la disponibilidad
                    value={formatPrice(totalInventoryValue)} 
                    icon="fas fa-dollar-sign" 
                    bgColor="bg-green-500"
                />
                <MetricCard 
                    title="Ítems en Stock Crítico" 
                    value={criticalStock.length} 
                    icon="fas fa-exclamation-triangle" 
                    bgColor="bg-red-500"
                />
            </div>

            {/* Tabla de Inventario Crítico (Reporte 1) */}
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                ⚠️ Inventario Crítico (Stock ≤ {LOW_STOCK_THRESHOLD})
            </h3>

            {criticalStock.length === 0 ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center">
                    ¡Excelente! No hay productos en nivel de stock crítico.
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-red-500 uppercase tracking-wider">Stock Actual</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {criticalStock.map(p => (
                                <tr key={p.id} className="hover:bg-red-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{formatPrice(p.price)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600 text-right">{p.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
};

// Componente auxiliar para las tarjetas de métricas
const MetricCard = ({ title, value, icon, bgColor }) => (
    <div className={`p-6 rounded-xl text-white shadow-xl ${bgColor} flex items-center justify-between`}>
        <div>
            <p className="text-sm font-medium opacity-80">{title}</p>
            <p className="text-3xl font-extrabold mt-1">{value}</p>
        </div>
        <i className={`${icon} text-4xl opacity-50`}></i>
    </div>
);

export default ImportadorDashboard;