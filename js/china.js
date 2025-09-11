// Datos de ejemplo para reportes y otras secciones
const reportData = {
    'dashboard': { // Añadido para título y subtítulo
        title: 'Dashboard',
        subtitle: 'Bienvenido al panel de administración de China',
    },
    'ventas-totales': {
        title: 'Ventas Totales (P, P, C)',
        subtitle: 'Resumen de ventas de Parlantes, Pendrives y Cámaras',
        data: {
            // Recalcular totales basados solo en las 3 categorías
            totalVentas: 4500000 + 2000000 + 6000000, // Parlantes + Pendrives + Cámaras
            totalUnidades: 300 + 350 + 200,         // Parlantes + Pendrives + Cámaras
            ventasPorCategoria: [
                { categoria: 'Parlantes', ventas: 4500000, cantidad: 300, color: 'bg-blue-500', icon: 'fas fa-volume-up' },
                { categoria: 'Pendrives', ventas: 2000000, cantidad: 350, color: 'bg-green-500', icon: 'fas fa-usb' },
                { categoria: 'Cámaras', ventas: 6000000, cantidad: 200, color: 'bg-purple-500', icon: 'fas fa-camera' }
            ],
            // totalProductosVendidos se puede calcular sumando las cantidades
            totalProductosVendidos: 300 + 350 + 200, 
        }
    },
    'ganancias-mensuales': {
        title: 'Ganancias Mensuales',
        subtitle: 'Evolución de las ganancias generales en los últimos 6 meses', // Asumimos que esto es general
        data: {
            meses: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], 
            ganancias: [1800000, 1950000, 2100000, 2050000, 2300000, 2500000], // Mantener como general
            costos: [1200000, 1300000, 1400000, 1350000, 1500000, 1600000]    // Mantener como general
        }
    },
    'top-productos': {
        title: 'Productos Destacados (P, P, C)',
        subtitle: 'Productos más vendidos de Parlantes, Pendrives y Cámaras',
        data: [ // Asegurar que solo sean de las categorías permitidas y añadir más datos para un "top"
            { id: 'P001', nombre: 'Parlante JBL Flip 5', categoria: 'Parlantes', ventas: 2200000, cantidad: 150, imagen: 'img/jblcharge.jpg', ganancias: 750000 },
            { id: 'C001', nombre: 'Bose SoundLink Revolve+', categoria: 'Parlantes', ventas: 3500000, cantidad: 100, imagen: 'img/bose.jpg', ganancias: 1250000 },
            { id: 'PEN001', nombre: 'Sony SRS-XB43', categoria: 'Parlantes', ventas: 1800000, cantidad: 250, imagen: 'img/sony.jpg', ganancias: 600000 },
            { id: 'P002', nombre: 'Amazon Echo Studio', categoria: 'Parlantes', ventas: 1500000, cantidad: 200, imagen: 'img/echo.jpg', ganancias: 500000 },
            { id: 'C002', nombre: 'Marshall Stanmore II', categoria: 'Parlantes', ventas: 2800000, cantidad: 120, imagen: 'img/marshall.jpg', ganancias: 900000 },
            // Se pueden agregar más productos o ajustar estos para tener un top 5 o 6.
        ]
    },
    'shipping-history': {
        title: 'Historial de Envíos',
        subtitle: 'Registro de todos los envíos realizados',
        // Datos para shipping-history pueden cargarse aquí si se hace dinámico
    },
    'inventory': {
        title: 'Gestión de Inventario',
        subtitle: 'Control y edición de stock de productos',
        data: [
            { id: 'P001', name: 'Parlante Bluetooth X1', stock: 120 },
            { id: 'C002', name: 'Cámara 4K Ultra HD', stock: 95 },
            { id: 'P003', name: 'Pendrive 128GB USB 3.0', stock: 210 },
            { id: 'P004', name: 'Parlante Inalámbrico Pro', stock: 85 }
        ]
    },
    'billing': {
        title: 'Facturación',
        subtitle: 'Gestión de facturas emitidas y pendientes',
        data: [
            { id: 'F-2025-001', cliente: 'Distribuidora Sur', monto: 2000000, estado: 'Pendiente' },
            { id: 'F-2025-002', cliente: 'Comercial Norte', monto: 1500000, estado: 'Pagado' },
            { id: 'F-2025-003', cliente: 'Retail Express', monto: 3500000, estado: 'Pendiente' }
        ]
    }
};

const sectionPageTitles = {
    'dashboard': 'Dashboard',
    'ventas-totales': 'Ventas Totales',
    'ganancias-mensuales': 'Ganancias Mensuales',
    'top-productos': 'Top Productos',
    'shipping-history': 'Historial de Envíos',
    'inventory-management': 'Gestión de Inventario',
    'billing': 'Facturación'
};

const sectionPageSubtitles = {
    'dashboard': 'Bienvenido al panel de administración de China',
    'ventas-totales': 'Resumen de ventas globales y por categoría',
    'ganancias-mensuales': 'Evolución de las ganancias en los últimos 6 meses',
    'top-productos': 'Los 10 productos con mayor volumen de ventas',
    'shipping-history': 'Registro de todos los envíos realizados',
    'inventory-management': 'Control y edición de stock de productos',
    'billing': 'Gestión de facturas emitidas y pendientes'
};


// --- GENERACIÓN DE HTML PARA REPORTES Y SECCIONES ---

function generateTotalSalesReportHTML(report) {
    const data = report.data;
    if (!data || !data.ventasPorCategoria) return '<p>Datos no disponibles para Ventas Totales.</p>';

    // Calcular datos para el gráfico de dona
    const donutChartData = {
        labels: data.ventasPorCategoria.map(cat => cat.categoria),
        datasets: [{
            data: data.ventasPorCategoria.map(cat => cat.ventas),
            backgroundColor: data.ventasPorCategoria.map(cat => {
                // Asignar colores más visuales o tomar de cat.color si se define ahí
                if (cat.categoria === 'Parlantes') return 'rgba(59, 130, 246, 0.7)'; // Azul
                if (cat.categoria === 'Pendrives') return 'rgba(34, 197, 94, 0.7)'; // Verde
                if (cat.categoria === 'Cámaras') return 'rgba(168, 85, 247, 0.7)'; // Púrpura
                return 'rgba(201, 203, 207, 0.7)'; // Gris por defecto
            }),
            borderColor: data.ventasPorCategoria.map(cat => {
                if (cat.categoria === 'Parlantes') return 'rgb(59, 130, 246)';
                if (cat.categoria === 'Pendrives') return 'rgb(34, 197, 94)';
                if (cat.categoria === 'Cámaras') return 'rgb(168, 85, 247)';
                return 'rgb(201, 203, 207)';
            }),
            borderWidth: 1
        }]
    };

    let html = `
        <div class="space-y-8 p-4 md:p-6 bg-gray-100 rounded-lg">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Resumen de Ventas</h2>
            <p class="text-sm text-gray-600 mb-6">${report.subtitle || ''}</p>

            <!-- Tarjeta Principal de Totales -->
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <div class="flex flex-col md:flex-row md:items-center md:space-x-6">
                    <div class="flex-1 mb-4 md:mb-0">
                        <h3 class="text-lg font-semibold text-gray-500 mb-1">Ventas Totales Consolidadas</h3>
                        <p class="text-5xl font-extrabold text-primary-600 mb-2">$${(data.totalVentas || 0).toLocaleString('es-CL')}</p>
                        <p class="text-md text-gray-700"><span class="font-semibold">${(data.totalUnidades || 0).toLocaleString('es-CL')}</span> unidades vendidas en total</p>
                    </div>
                    <div class="w-full md:w-1/3 h-48 md:h-56">
                        <canvas id="salesDonutChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Tarjetas de Detalle por Categoría -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
    `;

    (data.ventasPorCategoria || []).forEach(cat => {
        const categoryColor = cat.color || 'bg-gray-500'; // Color por defecto
        const categoryIcon = cat.icon || 'fas fa-tag'; // Icono por defecto
        html += `
            <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                <div class="flex items-center text-gray-700 mb-3">
                    <span class="p-3 rounded-full ${categoryColor} text-white mr-4 shadow">
                        <i class="${categoryIcon} text-xl"></i>
                    </span>
                    <h4 class="text-xl font-semibold">${cat.categoria}</h4>
                </div>
                <p class="text-3xl font-bold text-gray-800 mb-1">$${(cat.ventas || 0).toLocaleString('es-CL')}</p>
                <p class="text-sm text-gray-600">${(cat.cantidad || 0).toLocaleString('es-CL')} unidades</p>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div class="${categoryColor} h-2.5 rounded-full" style="width: ${data.totalVentas > 0 ? (cat.ventas / data.totalVentas * 100) : 0}%"></div>
                </div>
                <p class="text-xs text-gray-500 text-right mt-1">${data.totalVentas > 0 ? Math.round(cat.ventas / data.totalVentas * 100) : 0}% del total</p>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;
    // Necesitamos inicializar el gráfico de dona después de que el HTML se inserte en el DOM
    // Lo haremos en loadReportContent
    return html;
}


let earningsChartInstance = null; // Para el gráfico de líneas de ganancias
let salesDonutChartInstance = null; // Para el nuevo gráfico de dona de ventas

function generateMonthlyEarningsReportHTML(report) {
    const data = report.data;
    if (!data) return '<p>Datos no disponibles para Ganancias Mensuales.</p>';
    
    return `
        <div class="space-y-8 p-4 md:p-6 bg-gray-100 rounded-lg">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Análisis de Rentabilidad Mensual</h2>
            <p class="text-sm text-gray-600 mb-6">${report.subtitle || 'Evolución de ingresos y costos generales.'}</p>

            <div class="bg-white p-6 rounded-xl shadow-lg mb-8">
                <h3 class="text-xl font-semibold text-gray-700 mb-4">Ingresos vs. Costos Mensuales</h3>
                <div class="h-80 md:h-96">
                    <canvas id="earningsChart"></canvas>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-700">Detalle Mensual</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mes</th>
                                <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Ingresos</th>
                                <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Costos</th>
                                <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Ganancia Neta</th>
                                <th class="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Margen %</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-100">
                            ${(data.meses || []).map((mes, index) => {
                                const ingresos = data.ganancias[index] || 0; // Renombrar 'ganancias' a 'ingresos' para claridad
                                const costos = data.costos[index] || 0;
                                const utilidad = ingresos - costos;
                                const margen = ingresos > 0 ? Math.round(utilidad / ingresos * 100) : 0;
                                return `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">${mes}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">$${ingresos.toLocaleString('es-CL')}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">$${costos.toLocaleString('es-CL')}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold ${utilidad >= 0 ? 'text-green-600' : 'text-red-600'} text-right">$${utilidad.toLocaleString('es-CL')}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                                            <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${margen >= 20 ? 'bg-green-100 text-green-800' : margen >=0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                                                ${margen}%
                                            </span>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                         <tfoot class="bg-gray-50">
                            <tr>
                                <td class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">TOTAL</td>
                                <td class="px-6 py-3 text-right text-sm font-bold text-gray-800">$${(data.ganancias.reduce((a,b) => a+b,0)).toLocaleString('es-CL')}</td>
                                <td class="px-6 py-3 text-right text-sm font-bold text-gray-800">$${(data.costos.reduce((a,b) => a+b,0)).toLocaleString('es-CL')}</td>
                                <td class="px-6 py-3 text-right text-sm font-bold ${ (data.ganancias.reduce((a,b) => a+b,0) - data.costos.reduce((a,b) => a+b,0)) >=0 ? 'text-green-700' : 'text-red-700' }">$${(data.ganancias.reduce((a,b) => a+b,0) - data.costos.reduce((a,b) => a+b,0)).toLocaleString('es-CL')}</td>
                                <td class="px-6 py-3 text-center"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    `;
}


function initializeEarningsChart() { 
    const chartCanvas = document.getElementById('earningsChart');
    if (!chartCanvas) {
        // console.log("Canvas para gráfico de ganancias no encontrado. Saltando inicialización.");
        return;
    }
    
    const data = reportData['ganancias-mensuales']?.data;
    if (!data || !data.meses || !data.ganancias || !data.costos) {
        console.error("Datos insuficientes para inicializar el gráfico de ganancias.");
        chartCanvas.parentElement.innerHTML = '<p class="text-center text-red-500">Error: Datos insuficientes para el gráfico.</p>';
        return;
    }

    if (earningsChartInstance) {
        earningsChartInstance.destroy();
    }

    earningsChartInstance = new Chart(chartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: data.meses,
            datasets: [
                {
                    label: 'Ingresos',
                    data: data.ganancias,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'Costos',
                    data: data.costos,
                    borderColor: 'rgb(239, 68, 68)',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    fill: true,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                title: { display: true, text: 'Ingresos y Costos Mensuales', font: { size: 16, weight: 'bold' }, padding: { top: 10, bottom: 20 } },
                legend: { position: 'top', labels: { usePointStyle: true, font: { size: 12 } } },
                tooltip: { 
                    mode: 'index', 
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += '$' + context.parsed.y.toLocaleString('es-CL');
                            }
                            return label;
                        }
                    }
                } 
            },
            scales: {
                y: { 
                    beginAtZero: true, 
                    title: { display: true, text: 'Monto ($)', font: { weight: 'semibold'} }, 
                    ticks: { callback: value => '$' + value.toLocaleString('es-CL') } 
                },
                x: { 
                    title: { display: true, text: 'Mes', font: { weight: 'semibold'} } 
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

function initializeSalesDonutChart() {
    const donutCtx = document.getElementById('salesDonutChart');
    if (!donutCtx) {
        // console.log("Canvas para gráfico de dona de ventas no encontrado. Saltando inicialización.");
        return;
    }

    const salesData = reportData['ventas-totales']?.data?.ventasPorCategoria;
    if (!salesData || salesData.length === 0) {
        console.error('Datos insuficientes para el gráfico de dona de ventas.');
        donutCtx.parentElement.innerHTML = '<p class="text-center text-red-500">Error: Datos insuficientes para el gráfico.</p>';
        return;
    }

    if (salesDonutChartInstance) {
        salesDonutChartInstance.destroy();
    }

    const chartData = {
        labels: salesData.map(cat => cat.categoria),
        datasets: [{
            label: 'Ventas por Categoría',
            data: salesData.map(cat => cat.ventas),
            backgroundColor: salesData.map(cat => {
                if (cat.categoria === 'Parlantes') return 'rgba(59, 130, 246, 0.8)';
                if (cat.categoria === 'Pendrives') return 'rgba(34, 197, 94, 0.8)';
                if (cat.categoria === 'Cámaras') return 'rgba(168, 85, 247, 0.8)';
                return 'rgba(156, 163, 175, 0.8)'; // Gris por defecto
            }),
            borderColor: salesData.map(cat => {
                if (cat.categoria === 'Parlantes') return 'rgb(59, 130, 246)';
                if (cat.categoria === 'Pendrives') return 'rgb(34, 197, 94)';
                if (cat.categoria === 'Cámaras') return 'rgb(168, 85, 247)';
                return 'rgb(156, 163, 175)';
            }),
            borderWidth: 2,
            hoverOffset: 8
        }]
    };

    salesDonutChartInstance = new Chart(donutCtx.getContext('2d'), {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateScale: true,
                animateRotate: true
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: { size: 12 }
                    }
                },
                title: {
                    display: true,
                    text: 'Distribución de Ventas por Categoría',
                    font: { size: 14, weight: 'semibold' },
                    padding: { top: 5, bottom: 15 }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            const value = context.parsed;
                            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? (value / total * 100).toFixed(1) : 0;
                            label += '$' + value.toLocaleString('es-CL') + ` (${percentage}%)`;
                            return label;
                        }
                    }
                }
            }
        }
    });
}


function generateTopProductsReportHTML(report) {
    const products = report.data;
    if (!products || products.length === 0) return '<p>No hay productos destacados para mostrar.</p>';

    // Ordenar productos por ventas (descendente) y tomar el top N (ej. 5)
    const topNProducts = products.sort((a, b) => b.ventas - a.ventas).slice(0, 5);

    let html = `
        <div class="space-y-8 p-4 md:p-6 bg-gray-100 rounded-lg">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Productos Destacados</h2>
            <p class="text-sm text-gray-600 mb-6">${report.subtitle || 'Los productos más vendidos de las categorías seleccionadas.'}</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    `;

    topNProducts.forEach((product, index) => {
        // Asignar un color de badge basado en la categoría para consistencia
        let badgeColor = 'bg-gray-200 text-gray-700';
        if (product.categoria === 'Parlantes') badgeColor = 'bg-blue-100 text-blue-700';
        else if (product.categoria === 'Cámaras') badgeColor = 'bg-purple-100 text-purple-700';
        else if (product.categoria === 'Pendrives') badgeColor = 'bg-green-100 text-green-700';

        html += `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
                <div class="relative">
                    <img src="${product.imagen || 'https://via.placeholder.com/300x200/E0E0E0/B0B0B0?Text=Producto'}" alt="${product.nombre}" class="w-full h-48 object-cover">
                    <span class="absolute top-3 right-3 ${badgeColor} text-xs font-semibold px-2.5 py-1 rounded-full">${product.categoria}</span>
                    ${index < 3 ? `<span class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">#${index + 1}</span>` : ''}
                </div>
                <div class="p-5 flex flex-col flex-grow">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2 truncate" title="${product.nombre}">${product.nombre}</h3>
                    
                    <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                        <div>
                            <p class="text-gray-500">Ventas:</p>
                            <p class="font-semibold text-gray-700">$${(product.ventas || 0).toLocaleString('es-CL')}</p>
                        </div>
                        <div>
                            <p class="text-gray-500">Unidades:</p>
                            <p class="font-semibold text-gray-700">${(product.cantidad || 0).toLocaleString('es-CL')}</p>
                        </div>
                        <div>
                            <p class="text-gray-500">Ganancias:</p>
                            <p class="font-semibold text-green-600">$${(product.ganancias || 0).toLocaleString('es-CL')}</p>
                        </div>
                    </div>
                    
                    <div class="mt-auto pt-3 border-t border-gray-200">
                        <button class="w-full text-sm text-primary-600 hover:text-primary-700 font-medium py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors">
                            Ver Detalles <i class="fas fa-arrow-right ml-1 text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;
    return html;
}


function loadInventory() {
    const container = document.getElementById('inventory-table-container');
    if (!container) {
        console.error('Contenedor de inventario no encontrado.');
        return;
    }
    const data = reportData.inventory.data;
    let html = `<table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editar</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        ${data.map(item => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.stock}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button class="text-primary-600 hover:text-primary-900">Editar</button>
                </td>
            </tr>
        `).join('')}
        </tbody>
    </table>`;
    container.innerHTML = html;
}

function loadBilling() {
    const container = document.getElementById('billing-table-container');
    if (!container) {
        console.error('Contenedor de facturación no encontrado.');
        return;
    }
    const data = reportData.billing.data;
    let html = `<table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Factura</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        ${data.map(item => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.id}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.cliente}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${item.monto.toLocaleString('es-CL')}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${item.estado === 'Pagado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                        ${item.estado}
                    </span>
                </td>
            </tr>
        `).join('')}
        </tbody>
    </table>`;
    container.innerHTML = html;
}


// --- LÓGICA DE NAVEGACIÓN Y MANEJO DE SECCIONES ---
const mainContentSectionIDs = [
    'dashboard-content', 
    'report-content-wrapper', 
    'shipping-history-content', 
    'inventory-management-content', 
    'billing-content'
];

function showSection(sectionId) {
    if (!sectionId) {
        console.error("sectionId no proporcionado a showSection");
        return;
    }

    mainContentSectionIDs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    const pageTitleEl = document.getElementById('page-title');
    const pageSubtitleEl = document.getElementById('page-subtitle');

    if (pageTitleEl) pageTitleEl.textContent = sectionPageTitles[sectionId] || 'Panel';
    if (pageSubtitleEl) pageSubtitleEl.textContent = sectionPageSubtitles[sectionId] || 'Detalles de la sección';


    let targetContentId = '';
    switch (sectionId) {
        case 'dashboard':
            targetContentId = 'dashboard-content';
            break;
        case 'ventas-totales':
        case 'ganancias-mensuales':
        case 'top-productos':
            targetContentId = 'report-content-wrapper';
            loadReportContent(sectionId);
            break;
        case 'shipping-history':
            targetContentId = 'shipping-history-content';
            // loadShippingHistory(); // Si se hiciera dinámico
            break;
        case 'inventory-management':
            targetContentId = 'inventory-management-content';
            loadInventory();
            break;
        case 'billing':
            targetContentId = 'billing-content';
            loadBilling();
            break;
        default:
            console.error(`Sección desconocida: ${sectionId}`);
            targetContentId = 'dashboard-content'; // Por defecto al dashboard
            if (pageTitleEl) pageTitleEl.textContent = sectionPageTitles['dashboard'];
            if (pageSubtitleEl) pageSubtitleEl.textContent = sectionPageSubtitles['dashboard'];
    }

    const sectionElement = document.getElementById(targetContentId);
    if (sectionElement) {
        sectionElement.classList.remove('hidden');
    } else {
        console.error(`Elemento de contenido no encontrado para ID: ${targetContentId}`);
        // Mostrar dashboard por defecto si falla la carga de la sección
        document.getElementById('dashboard-content')?.classList.remove('hidden');
    }
    window.scrollTo(0, 0);
}

function loadReportContent(reportId) {
    const reportContainer = document.getElementById('report-content');
    if (!reportContainer) {
        console.error("El contenedor 'report-content' no existe.");
        return;
    }

    const reportInfo = reportData[reportId];
    if (!reportInfo) {
        reportContainer.innerHTML = "<p>Reporte no encontrado.</p>";
        return;
    }
    
    reportContainer.innerHTML = ''; // Limpiar contenido anterior

    switch (reportId) {
        case 'ventas-totales':
            reportContainer.innerHTML = generateTotalSalesReportHTML(reportInfo);
            // Destruir instancia anterior del gráfico de ganancias si existe y no estamos en esa sección
            if (earningsChartInstance) { earningsChartInstance.destroy(); earningsChartInstance = null; }
            initializeSalesDonutChart(); // Inicializar el nuevo gráfico de dona
            break;
        case 'ganancias-mensuales':
            reportContainer.innerHTML = generateMonthlyEarningsReportHTML(reportInfo);
            // Destruir instancia anterior del gráfico de dona si existe y no estamos en esa sección
            if (salesDonutChartInstance) { salesDonutChartInstance.destroy(); salesDonutChartInstance = null; }
            initializeEarningsChart(); // Inicializar el gráfico de líneas de ganancias
            break;
        case 'top-productos':
            reportContainer.innerHTML = generateTopProductsReportHTML(reportInfo);
            // Destruir instancias de gráficos si no estamos en sus secciones
            if (earningsChartInstance) { earningsChartInstance.destroy(); earningsChartInstance = null; }
            if (salesDonutChartInstance) { salesDonutChartInstance.destroy(); salesDonutChartInstance = null; }
            break;
        default:
            reportContainer.innerHTML = "<p>Seleccione un reporte válido.</p>";
    }
}

function setActiveNav(sectionId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active', 'bg-primary-700', 'text-white');
        // Restaurar clases por defecto para items inactivos (coincidir con HTML)
        item.classList.add('text-primary-100', 'hover:bg-primary-700', 'hover:text-white'); 
        if (item.dataset.section === sectionId) {
            item.classList.add('active', 'bg-primary-700', 'text-white');
            item.classList.remove('text-primary-100'); // Quitar la clase de inactivo
        }
    });
}

function logout() {
    localStorage.removeItem('chinaLoggedIn');
    window.location.href = 'login_importadores.html';
}

// --- MODAL ---
function showDetailModal(title, items) { // items es un array de objetos {name, quantity, price}
    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContentArea = document.getElementById('modal-content-area');

    if (!modal || !modalTitle || !modalContentArea) return;

    modalTitle.textContent = title;
    
    let contentHtml = `
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio Unit.</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">`;
    
    let overallTotal = 0;
    items.forEach(item => {
        const itemTotal = item.quantity * item.price;
        overallTotal += itemTotal;
        contentHtml += `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.quantity}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${item.price.toLocaleString('es-CL')}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${itemTotal.toLocaleString('es-CL')}</td>
            </tr>`;
    });

    contentHtml += `
            </tbody>
            <tfoot class="bg-gray-50">
                <tr>
                    <th colspan="3" class="px-6 py-3 text-right text-sm font-medium text-gray-700 uppercase">Total General</th>
                    <th class="px-6 py-3 text-left text-sm font-medium text-gray-900">$${overallTotal.toLocaleString('es-CL')}</th>
                </tr>
            </tfoot>
        </table>`;
    
    modalContentArea.innerHTML = contentHtml;
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('detail-modal');
    if (modal) modal.classList.add('hidden');
}


// --- INICIALIZACIÓN ---
function initializeApp() {
    // Autenticación
    const isLoggedIn = localStorage.getItem('chinaLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login_importadores.html';
        return; // Detener ejecución si no está logueado
    }

    // Navegación
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.dataset.section;
            if (sectionId) {
                showSection(sectionId);
                setActiveNav(sectionId);
                // Cerrar sidebar en móvil si está abierto
                if (window.innerWidth < 768) { // md breakpoint
                    const sidebar = document.getElementById('sidebar');
                    sidebar.classList.add('-translate-x-full');
                    sidebar.classList.remove('translate-x-0');
                    document.getElementById('sidebar-overlay').classList.add('hidden');
                }
            }
        });
    });

    // Botón de logout
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
    
    // Tooltips (si Tippy.js está cargado)
    if (typeof tippy === 'function') {
        tippy('[data-tippy-content]');
    } else {
        // console.warn("Tippy.js no está cargado. Los tooltips no funcionarán.");
    }

    // Sidebar móvil
    const sidebar = document.getElementById('sidebar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (mobileMenuButton && sidebar && sidebarOverlay) {
        mobileMenuButton.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
            sidebar.classList.toggle('translate-x-0');
            sidebarOverlay.classList.toggle('hidden');
        });
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            sidebar.classList.remove('translate-x-0');
            sidebarOverlay.classList.add('hidden');
        });
    }
    
    // Modal
    const closeModalButton = document.getElementById('close-modal-button');
    const closeModalButtonFooter = document.getElementById('close-modal-button-footer');
    if(closeModalButton) closeModalButton.addEventListener('click', closeModal);
    if(closeModalButtonFooter) closeModalButtonFooter.addEventListener('click', closeModal);
    
    // Estado inicial
    const initialSection = 'dashboard'; // O tomar de URL hash si se implementa
    showSection(initialSection);
    setActiveNav(initialSection);

    // Hacer funciones globales si es necesario (ej. para onclick en HTML, aunque se prefiere event listeners)
    window.showDetailModal = showDetailModal; 
}

document.addEventListener('DOMContentLoaded', initializeApp);

// Exponer funciones globalmente si alguna parte del HTML las necesita directamente (ej. onclick)
// Es mejor usar event listeners en JS, pero por si acaso para el modal.
window.closeModal = closeModal;
window.logout = logout; // El botón de logout ya tiene un listener, pero por si acaso.
