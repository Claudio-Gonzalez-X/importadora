// src/data/products.js

// Los datos originales de Parlantes ya tienen IDs 1 a 6
const Parlantes = [
  { id: 1, nombre: "Parlante JBL Flip 5", descripcion: "Parlante portátil con sonido potente y resistente al agua. Ideal para llevar a cualquier lugar.", precio: 79990, imagenUrl: "img/jblcharge.jpg", categoria: "Parlantes Portátiles", stock: 15, destacado: true },
  { id: 2, nombre: "Bose SoundLink Revolve+", descripcion: "Parlante 360° con sonido potente y batería de hasta 16 horas de duración.", precio: 129990, imagenUrl: "img/bose.jpg", categoria: "Parlantes Portátiles", stock: 8, destacado: false },
  { id: 3, nombre: "Sony SRS-XB43", descripcion: "Parlante inalámbrico extra bass con luces LED y resistencia al agua IP67.", precio: 149990, imagenUrl: "img/sony.jpg", categoria: "Parlantes Potentes", stock: 12, destacado: true },
  { id: 4, nombre: "Amazon Echo Studio", descripcion: "Parlante inteligente con sonido 3D y Alexa integrada para control por voz.", precio: 159990, imagenUrl: "img/echo.jpg", categoria: "Parlantes Inteligentes", stock: 5, destacado: false },
  { id: 5, nombre: "Marshall Stanmore II", descripcion: "Parlante Bluetooth con diseño clásico y sonido potente para audiófilos exigentes.", precio: 349990, imagenUrl: "img/marshall.jpg", categoria: "Parlantes Potentes", stock: 3, destacado: true },
  { id: 6, nombre: "Google Nest Audio", descripcion: "Parlante inteligente con Google Assistant y sonido balanceado.", precio: 89990, imagenUrl: "img/nest.jpg", categoria: "Parlantes Inteligentes", stock: 20, destacado: false }
];

// Los datos originales de Cámaras ya tienen IDs 101 a 106
// NO NECESITAN OFFSET, ya que no chocan con Parlantes (1-6).
const camaras = [
  { id: 101, nombre: 'Cámara Mirrorless Sony Alpha A7 III', precio: 1499990, imagenUrl: 'img/sony-alpha.png', descripcion: 'Cámara mirrorless full frame con sensor de 24.2MP, enfoque automático rápido y excelente rendimiento en condiciones de poca luz.', categoria: 'Mirrorless', stock: 8, destacado: true },
  { id: 102, nombre: 'Cámara DSLR Canon EOS 90D', precio: 1299990, imagenUrl: 'img/canon 90d.jpg', descripcion: 'Cámara DSLR con sensor APS-C de 32.5MP, grabación 4K y doble AF con detección de fase.', categoria: 'DSLR', stock: 5, destacado: false },
  { id: 103, nombre: 'GoPro HERO10 Black', precio: 649990, imagenUrl: 'img/go-pro.jpg', descripcion: 'Cámara de acción con estabilización HyperSmooth 4.0, video 5.3K60 y pantalla táctil mejorada.', categoria: 'Acción', stock: 12, destacado: true },
  { id: 104, nombre: 'DJI Mavic Air 2', precio: 1299990, imagenUrl: 'img/mavic.png', descripcion: 'Dron con cámara 4K/60fps, sensor de 1/2" y 48MP, hasta 34 minutos de vuelo.', categoria: 'Dron', stock: 4, destacado: false },
  { id: 105, nombre: 'Sony ZV-1', precio: 899990, imagenUrl: 'img/sony-zv.jpg', descripcion: 'Cámara compacta para vlogging con sensor de 1", grabación 4K, micrófono direccional y pantalla LCD abatible.', categoria: 'Compacta', stock: 7, destacado: true },
  { id: 106, nombre: 'Nikon Z6 II', precio: 1899990, imagenUrl: 'img/nikon.jpg', descripcion: 'Cámara mirrorless full frame con doble procesador, 24.5MP, 4K/60p y estabilización de 5 ejes.', categoria: 'Mirrorless', stock: 3, destacado: false }
];

// Los datos originales de Pendrives tienen IDs 201 a 206
// NO NECESITAN OFFSET, ya que no chocan con los otros dos grupos.
const pendrives = [
  { id: 201, nombre: "Pendrive SanDisk Ultra 64GB", descripcion: "Almacenamiento USB 3.0 con hasta 150MB/s de velocidad de lectura. Ideal para transferencias rápidas.", precio: 12990, imagenUrl: "img/pendrive1.jpg", categoria: "USB 3.0", stock: 25, destacado: true },
  { id: 202, nombre: "Samsung BAR Plus 128GB", descripcion: "Diseño metálico resistente con velocidades de lectura/escritura de hasta 300MB/s. Resistente al agua, imanes, temperaturas extremas y rayos X.", precio: 24990, imagenUrl: "img/pendrive2.jpg", categoria: "USB 3.1", stock: 18, destacado: true },
  { id: 203, nombre: "Kingston DataTraveler 32GB", descripcion: "Pendrive USB 3.2 con tapa deslizante y protección de contraseña. Ideal para almacenar documentos importantes.", precio: 8990, imagenUrl: "img/pendrive3.jpg", categoria: "USB 3.2", stock: 30, destacado: false },
  { id: 204, nombre: "HP x765w 256GB", descripcion: "Alta capacidad de almacenamiento con diseño compacto y anillo para llavero. Compatible con USB 3.0 y 2.0.", precio: 34990, imagenUrl: "img/pendrive4.jpg", categoria: "USB 3.0", stock: 10, destacado: false },
  { id: 205, nombre: "Lexar JumpDrive S47 128GB", descripcion: "Pendrive con protección por contraseña y cifrado de hardware. Incluye software de respaldo y sincronización.", precio: 28990, imagenUrl: "img/pendrive5.jpg", categoria: "Seguridad", stock: 8, destacado: true },
  { id: 206, nombre: "PNY Turbo 64GB", descripcion: "Diseño giratorio 360° con velocidades de hasta 100MB/s. Garantía de por vida del fabricante.", precio: 11990, imagenUrl: "img/pendrive6.jpg", categoria: "USB 3.0", stock: 15, destacado: false }
];

// --- CONSOLIDACIÓN Y EXPORTACIÓN FINAL ---

/**
 * Array maestro que contiene TODOS los productos con IDs únicos (1-6, 101-106, 201-206).
 * Este es el único array que deben importar los componentes.
 */
export const ALL_PRODUCTS = [
  ...Parlantes,
  ...camaras,
  ...pendrives
];

// Opcional: Lista de categorías para la navegación
export const CATEGORIES = ['Parlantes', 'Cámaras', 'Pendrives'];


/**
 * Nota: 'export default products;' en tu snippet final causaría un error
 * porque 'products' no está definido. Lo cambiamos a 'export const ALL_PRODUCTS'.
 */
export default ALL_PRODUCTS; // Si deseas usar export default