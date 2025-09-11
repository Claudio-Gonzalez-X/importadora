// Lista de productos de cámaras
const productos = [
  {
    id: 1,
    nombre: 'Cámara Mirrorless Sony Alpha A7 III',
    precio: 1499990,
    imagenUrl: 'img/sony-alpha.png',
    descripcion: 'Cámara mirrorless full frame con sensor de 24.2MP, enfoque automático rápido y excelente rendimiento en condiciones de poca luz.',
    categoria: 'Mirrorless',
    stock: 8,
    destacado: true
  },
  {
    id: 2,
    nombre: 'Cámara DSLR Canon EOS 90D',
    precio: 1299990,
    imagenUrl: 'img/canon 90d.jpg',
    descripcion: 'Cámara DSLR con sensor APS-C de 32.5MP, grabación 4K y doble AF con detección de fase.',
    categoria: 'DSLR',
    stock: 5,
    destacado: false
  },
  {
    id: 3,
    nombre: 'GoPro HERO10 Black',
    precio: 649990,
    imagenUrl: 'img/go-pro.jpg',
    descripcion: 'Cámara de acción con estabilización HyperSmooth 4.0, video 5.3K60 y pantalla táctil mejorada.',
    categoria: 'Acción',
    stock: 12,
    destacado: true
  },
  {
    id: 4,
    nombre: 'DJI Mavic Air 2',
    precio: 1299990,
    imagenUrl: 'img/mavic.png',
    descripcion: 'Dron con cámara 4K/60fps, sensor de 1/2" y 48MP, hasta 34 minutos de vuelo.',
    categoria: 'Dron',
    stock: 4,
    destacado: false
  },
  {
    id: 5,
    nombre: 'Sony ZV-1',
    precio: 899990,
    imagenUrl: 'img/sony-zv.jpg',
    descripcion: 'Cámara compacta para vlogging con sensor de 1", grabación 4K, micrófono direccional y pantalla LCD abatible.',
    categoria: 'Compacta',
    stock: 7,
    destacado: true
  },
  {
    id: 6,
    nombre: 'Nikon Z6 II',
    precio: 1899990,
    imagenUrl: 'img/nikon.jpg',
    descripcion: 'Cámara mirrorless full frame con doble procesador, 24.5MP, 4K/60p y estabilización de 5 ejes.',
    categoria: 'Mirrorless',
    stock: 3,
    destacado: false
  }
];

// Hacer la lista de productos disponible globalmente
window.productos = productos;
