document.addEventListener('DOMContentLoaded', function() {
  // Inicializar el carrito
  const cart = [];
  const cartCounter = document.getElementById('cart-counter');
  const productosContainer = document.getElementById('productos-container');

  // Cargar carrito desde localStorage
  const carritoGuardado = localStorage.getItem('cart');
  if (carritoGuardado) {
    const itemsGuardados = JSON.parse(carritoGuardado);
    cart.push(...itemsGuardados);
  }

  // Formatear precio en CLP
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  // Guardar carrito en localStorage
  const saveCart = () => {
    try {
      // Asegurarse de que el carrito sea un array
      const cartToSave = Array.isArray(cart) ? cart : [];
      
      // Validar cada ítem del carrito
      const validCart = cartToSave.filter(item => 
        item && 
        item.id !== undefined && 
        item.quantity > 0 && 
        item.price > 0
      );
      
      // Guardar en localStorage
      localStorage.setItem('cart', JSON.stringify(validCart));
      
      // Actualizar la referencia del carrito
      cart = validCart;
      
      // Actualizar contador
      updateCartCounter();
      
      console.log('Carrito guardado:', validCart);
      return true;
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
      return false;
    }
  };

  // Actualizar contador del carrito
  const updateCartCounter = () => {
    if (!cartCounter) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
    if (totalItems > 0) {
      cartCounter.classList.remove('hidden');
    } else {
      cartCounter.classList.add('hidden');
    }
  };

  // Función para buscar productos
  function buscarProductos() {
    const busqueda = document.getElementById('buscar-productos').value.toLowerCase();
    const categoria = document.getElementById('filtro-categoria').value;
    
    const productosFiltrados = productos.filter(producto => {
      const coincideNombre = producto.nombre.toLowerCase().includes(busqueda) || 
                          producto.descripcion.toLowerCase().includes(busqueda);
      const coincideCategoria = categoria === 'todos' || producto.categoria === categoria;
      return coincideNombre && coincideCategoria;
    });
    
    mostrarProductos(productosFiltrados);
  }

  // Función para mostrar los productos
  function mostrarProductos(productosAMostrar = productos) {
    if (!productosContainer) return;

    if (productosAMostrar.length === 0) {
      productosContainer.innerHTML = `
        <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
          <p class="text-gray-500">No se encontraron productos que coincidan con la búsqueda.</p>
        </div>`;
      return;
    }

    productosContainer.innerHTML = productosAMostrar.map(producto => `
      <div class="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
        <div class="relative">
          <img src="${producto.imagenUrl}" alt="${producto.nombre}" class="w-full h-48 object-cover">
          ${producto.destacado ? '<span class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">Destacado</span>' : ''}
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-bold text-gray-800">${producto.nombre}</h3>
            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">${producto.categoria.replace('Parlantes ', '')}</span>
          </div>
          <p class="text-gray-600 text-sm mb-4 flex-grow">${producto.descripcion}</p>
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold text-green-600">${formatearPrecio(producto.precio)}</span>
            <button onclick="agregarAlCarrito(${producto.id})" 
                    class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center">
              <i class="fas fa-cart-plus mr-2"></i> Agregar
            </button>
          </div>
          <div class="mt-2 text-xs text-gray-500">${producto.stock} disponibles</div>
        </div>
      </div>
    `).join('');
  }

  // Función para agregar al carrito
  window.agregarAlCarrito = function(productoId) {
    try {
      const producto = productos.find(p => p.id === productoId);
      if (!producto) {
        console.error('Producto no encontrado:', productoId);
        return;
      }
      
      let itemInCart = cart.find(item => item.id === productoId);
      let mensaje = '';

      if (itemInCart) {
        if (itemInCart.quantity < producto.stock) {
          itemInCart.quantity++;
          mensaje = 'Cantidad actualizada en el carrito';
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Stock agotado',
            text: 'No hay más unidades disponibles de este producto',
            confirmButtonColor: '#0ea5e9',
          });
          return;
        }
      } else {
        cart.push({
          id: producto.id,
          name: producto.nombre,
          price: producto.precio,
          quantity: 1,
          image: producto.imagenUrl,
          category: producto.categoria
        });
        mensaje = 'Producto agregado al carrito';
      }
      
      // Guardar cambios
      saveCart();
      updateCartCounter();
      
      // Mostrar notificación
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        background: '#10b981',
        color: 'white',
        iconColor: 'white'
      });
      
      console.log('Carrito actualizado:', cart);
      
    } catch (error) {
      console.error('Error en agregarAlCarrito:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el producto al carrito',
        confirmButtonColor: '#0ea5e9',
      });
    }
  };

  const buscarInput = document.getElementById('buscar-productos');
  const filtroCategoria = document.getElementById('filtro-categoria');
  
  if (buscarInput) buscarInput.addEventListener('input', buscarProductos);
  if (filtroCategoria) filtroCategoria.addEventListener('change', buscarProductos);

  // Mostrar productos al cargar la página
  mostrarProductos();
  updateCartCounter();

  // Back to top button functionality
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
      } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
