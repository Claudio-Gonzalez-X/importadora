// Estado de la aplicación
let products = {
    // Categorías eliminadas: perfumes, telefonos, juegos
    parlantes: [],
    camaras: [],
    pendrives: []
  };
  let currentCategory = 'parlantes'; // Categoría por defecto
  
  const categoryDisplayNames = {
      // Entradas eliminadas: perfumes, telefonos, juegos
      'parlantes': 'Parlantes',
      'camaras': 'Cámaras',
      'pendrives': 'Pendrives',
      'settings': 'Configuración' // Si se implementa
  };
  
  // --- PERSISTENCIA DE DATOS ---
  function loadProductsFromStorage() {
      const savedProducts = localStorage.getItem('adminProducts');
      if (savedProducts) {
          try {
              let parsedProducts = JSON.parse(savedProducts);
              // Estandarizar IDs a strings y asegurar estructura
              Object.keys(categoryDisplayNames).forEach(categoryKey => {
                  if (categoryDisplayNames.hasOwnProperty(categoryKey) && categoryKey !== 'settings') {
                      if (Array.isArray(parsedProducts[categoryKey])) {
                          parsedProducts[categoryKey].forEach(product => {
                              if (product.id !== undefined && typeof product.id !== 'string') {
                                  product.id = product.id.toString();
                                  console.log(`[loadProductsFromStorage] ID convertido a string para producto: ${product.name}, nuevo ID: ${product.id}`);
                              }
                          });
                      } else {
                          // Si la categoría existía en categoryDisplayNames pero no en parsedProducts (o no es array), inicializarla.
                          parsedProducts[categoryKey] = [];
                      }
                  }
              });
              // Filtrar categorías que ya no existen en categoryDisplayNames
              const validCategories = Object.keys(categoryDisplayNames);
              for (const key in parsedProducts) {
                  if (!validCategories.includes(key)) {
                      delete parsedProducts[key];
                       console.log(`[loadProductsFromStorage] Categoría obsoleta eliminada de localStorage: ${key}`);
                  }
              }
              products = parsedProducts;
  
          } catch (e) {
              console.error("Error al parsear productos de localStorage o al estandarizar IDs:", e);
              initializeEmptyProducts(); 
              addSampleData(); // Añadir datos de ejemplo si la carga falla catastróficamente
              saveProductsToStorage();
          }
      } else {
          initializeEmptyProducts();
          addSampleData(); 
          saveProductsToStorage(); 
      }
      console.log("[loadProductsFromStorage] Productos cargados/inicializados:", JSON.parse(JSON.stringify(products)));
  }
  
  function initializeEmptyProducts() {
      products = {};
      // Solo inicializar las categorías que están actualmente en categoryDisplayNames
      Object.keys(categoryDisplayNames).forEach(catKey => {
          if (categoryDisplayNames.hasOwnProperty(catKey) && catKey !== 'settings') {
              products[catKey] = [];
          }
      });
  }
  
  function addSampleData() {
      // Asegurarse que solo se añaden datos a categorías existentes en products
      if (products.parlantes) {
          products.parlantes.push({ id: (Date.now()).toString(), name: "Parlante JBL Flip 5", price: 79990, stock: 25, description: "Sonido envolvente y bajos profundos.", image: "img/jblcharge.jpg" });
      }
      if (products.camaras) {
          products.camaras.push({ id: (Date.now() + 1).toString(), name: "Cámara GoPro Hero 10", price: 349990, stock: 10, description: "Captura imágenes profesionales con facilidad.", image: "img/go-pro.jpg" });
      }
      if (products.pendrives) {
          products.pendrives.push({ id: (Date.now() + 2).toString(), name: "Pendrive Sony 64GB", price: 12990, stock: 50, description: "Almacenamiento rápido y confiable.", image: "img/pendrive1.jpg" });
      }
  }
  
  
  function saveProductsToStorage() {
      localStorage.setItem('adminProducts', JSON.stringify(products));
  }
  
  // --- RENDERIZADO Y UI ---
  function renderCategoryProducts() {
      const categoryContentDiv = document.getElementById('admin-category-content');
      const categoryTitleH1 = document.getElementById('admin-category-title');
      const categorySubtitleP = document.getElementById('admin-category-subtitle');
  
      if (!categoryContentDiv || !categoryTitleH1 || !categorySubtitleP) {
          console.error("Elementos base de la UI no encontrados.");
          return;
      }
      
      categoryTitleH1.textContent = categoryDisplayNames[currentCategory] || 'Categoría Desconocida';
      categorySubtitleP.textContent = `Gestionando productos de la categoría ${categoryDisplayNames[currentCategory]}`;
  
      if (currentCategory === 'settings') {
          categoryContentDiv.innerHTML = `<div class="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Configuración</h2>
              <p class="text-gray-600">Esta sección está en desarrollo.</p>
          </div>`;
          return;
      }
  
      const productsInCategory = products[currentCategory] || [];
  
      let tableHTML = `
          <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-semibold text-gray-800">Productos en ${categoryDisplayNames[currentCategory]}</h2>
              <button id="admin-add-product-button" class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  <i class="fas fa-plus mr-2"></i>Agregar Producto
              </button>
          </div>
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
              <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                          <tr>
                              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                              <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                              <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                          </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">`;
  
      if (productsInCategory.length === 0) {
          tableHTML += `<tr><td colspan="4" class="px-6 py-10 text-center text-gray-500">No hay productos en esta categoría.</td></tr>`;
      } else {
          productsInCategory.forEach(product => {
              tableHTML += `
                  <tr class="hover:bg-gray-50 transition-colors duration-150">
                      <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                              <div class="flex-shrink-0 h-12 w-12">
                                  <img class="h-12 w-12 rounded-md object-cover shadow-sm" src="${product.image || 'https://via.placeholder.com/150/cccccc/969696?Text=NoImage'}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150/cccccc/969696?Text=Error'; this.onerror=null;">
                              </div>
                              <div class="ml-4">
                                  <div class="text-sm font-semibold text-gray-900">${product.name}</div>
                                  <div class="text-xs text-gray-500">${(product.description || '').substring(0, 40)}...</div>
                              </div>
                          </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$${(product.price || 0).toLocaleString('es-CL')}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                          <div class="flex items-center justify-center space-x-2">
                              <button data-action="decrease-stock" data-id="${product.id}" class="text-red-500 hover:text-red-700 p-1 ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}" ${product.stock <= 0 ? 'disabled' : ''} title="Disminuir stock"><i class="fas fa-minus-circle"></i></button>
                              <span class="w-10 text-center font-medium">${product.stock}</span>
                              <button data-action="increase-stock" data-id="${product.id}" class="text-green-500 hover:text-green-700 p-1" title="Aumentar stock"><i class="fas fa-plus-circle"></i></button>
                          </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                          <button data-action="edit-product" data-id="${product.id}" class="text-blue-600 hover:text-blue-800 mr-3" title="Editar"><i class="fas fa-edit"></i></button>
                          <button data-action="delete-product" data-id="${product.id}" class="text-red-600 hover:text-red-800" title="Eliminar"><i class="fas fa-trash"></i></button>
                      </td>
                  </tr>`;
          });
      }
      tableHTML += `</tbody></table></div></div>`;
      categoryContentDiv.innerHTML = tableHTML;
      attachTableButtonListeners(); // Añadir listeners a los nuevos botones
  }
  
  function attachTableButtonListeners() {
      document.querySelectorAll('[data-action="decrease-stock"]').forEach(button => button.addEventListener('click', handleStockChange));
      document.querySelectorAll('[data-action="increase-stock"]').forEach(button => button.addEventListener('click', handleStockChange));
      document.querySelectorAll('[data-action="edit-product"]').forEach(button => button.addEventListener('click', handleEditProduct));
      document.querySelectorAll('[data-action="delete-product"]').forEach(button => button.addEventListener('click', handleDeleteProduct));
      
      const addProductButton = document.getElementById('admin-add-product-button');
      if(addProductButton) addProductButton.addEventListener('click', showProductFormForAdd);
  }
  
  function handleStockChange(event) {
      const button = event.currentTarget;
      const productId = button.dataset.id;
      const action = button.dataset.action;
      const product = products[currentCategory]?.find(p => p.id === productId);
  
      if (product) {
          let newStock = product.stock;
          if (action === 'increase-stock') {
              newStock++;
          } else if (action === 'decrease-stock' && product.stock > 0) {
              newStock--;
          }
          updateStock(productId, newStock);
      }
  }
  
  function handleEditProduct(event) {
      const productId = event.currentTarget.dataset.id;
      showProductFormForEdit(productId);
  }
  
  function handleDeleteProduct(event) {
      const productId = event.currentTarget.dataset.id;
      confirmDeleteProduct(productId);
  }
  
  
  function setActiveNavItemJS(category) {
      document.querySelectorAll('#admin-sidebar .nav-item').forEach(item => {
          item.classList.remove('active', 'bg-primary-700', 'text-white');
          item.classList.add('text-primary-100');
          if (item.dataset.categoryJs === category) {
              item.classList.add('active', 'bg-primary-700', 'text-white');
              item.classList.remove('text-primary-100');
          }
      });
  }
  
  // --- FORMULARIO DE PRODUCTO (MODAL) ---
  const productFormModal = document.getElementById('admin-product-form-modal');
  const productFormElement = document.getElementById('admin-product-form-element');
  const formTitle = document.getElementById('admin-form-title');
  const productIdInput = document.getElementById('admin-product-id');
  const productNameInput = document.getElementById('admin-product-name');
  const productPriceInput = document.getElementById('admin-product-price');
  const productCategorySelect = document.getElementById('admin-product-category');
  const productStockInput = document.getElementById('admin-product-stock');
  const productDescriptionInput = document.getElementById('admin-product-description');
  const productImageInput = document.getElementById('admin-product-image');
  
  function showProductFormForAdd() {
      formTitle.textContent = 'Agregar Nuevo Producto';
      productFormElement.reset(); // Limpiar formulario
      productIdInput.value = ''; // Asegurar que el ID esté vacío para nuevo producto
      productCategorySelect.value = currentCategory; // Preseleccionar categoría actual
      productFormModal.classList.remove('hidden');
  }
  
  function showProductFormForEdit(productId) {
      console.log("[showProductFormForEdit] Intentando editar productId:", productId, "en currentCategory:", currentCategory);
      const product = products[currentCategory]?.find(p => p.id.toString() === productId.toString()); // Asegurar comparación de strings
      console.log("[showProductFormForEdit] Producto encontrado:", product);
  
      if (!product) {
          Swal.fire('Error', 'Producto no encontrado para editar.', 'error');
          console.error("[showProductFormForEdit] Producto NO encontrado con ID:", productId, "en categoría:", currentCategory);
          return;
      }
      formTitle.textContent = 'Editar Producto';
      productIdInput.value = product.id; // Este ID es el que se usará al guardar
      productNameInput.value = product.name;
      productPriceInput.value = product.price;
      productCategorySelect.value = currentCategory; 
      productStockInput.value = product.stock;
      productDescriptionInput.value = product.description || '';
      productImageInput.value = product.image || '';
      productFormModal.classList.remove('hidden');
  }
  
  function hideProductForm() {
      productFormModal.classList.add('hidden');
      productFormElement.reset();
  }
  
  function handleProductFormSubmit(event) {
      event.preventDefault();
      const idFromInput = productIdInput.value; 
      const categoryFromSelect = productCategorySelect.value; // Esta debería ser igual a currentCategory
      
      console.log("[handleProductFormSubmit] ID del input:", idFromInput, "Categoría del select:", categoryFromSelect, "currentCategory global:", currentCategory);
      
      // Es crucial que la categoría usada para guardar sea la `currentCategory`
      // donde el producto fue originalmente listado y seleccionado para editar,
      // o la categoría seleccionada si se está agregando un nuevo producto (aunque el select está disabled).
      // Para edición, el producto ya existe en `products[currentCategory]`.
      // Para adición, `currentCategory` es donde se va a añadir.
      const effectiveCategory = currentCategory;
  
      const productData = {
          id: idFromInput, 
          name: productNameInput.value.trim(),
          price: parseFloat(productPriceInput.value),
          stock: parseInt(productStockInput.value),
          description: productDescriptionInput.value.trim(),
          image: productImageInput.value.trim() || 'https://via.placeholder.com/150/cccccc/969696?Text=NoImage',
          // No incluimos 'category' en productData aquí, ya que se pasa explícitamente a saveProduct
      };
      console.log("[handleProductFormSubmit] productData a guardar:", productData, "en effectiveCategory:", effectiveCategory);
  
      if (!productData.name || isNaN(productData.price) || productData.price < 0 || isNaN(productData.stock) || productData.stock < 0) {
          Swal.fire('Datos Inválidos', 'Por favor, verifica el nombre, precio (positivo) y stock (positivo).', 'warning');
          return;
      }
      saveProduct(productData, effectiveCategory); 
  }
  
  // --- LÓGICA CRUD ---
  // Se pasa categoryToSaveTo explícitamente
  function saveProduct(productData, categoryToSaveTo) { 
      console.log("[saveProduct] Guardando en categoría:", categoryToSaveTo, "Datos:", productData);
  
      if (!products[categoryToSaveTo]) {
          products[categoryToSaveTo] = []; 
          console.warn("[saveProduct] Categoría", categoryToSaveTo, "no existía, fue creada.");
      }
  
      if (productData.id && productData.id !== '') { 
          console.log("[saveProduct] Modo Edición. Buscando ID:", productData.id, "en", categoryToSaveTo);
          const productIndex = products[categoryToSaveTo].findIndex(p => p.id.toString() === productData.id.toString());
          console.log("[saveProduct] productIndex encontrado:", productIndex);
  
          if (productIndex !== -1) {
              // Mantener el ID original, actualizar el resto.
              products[categoryToSaveTo][productIndex] = { 
                  ...products[categoryToSaveTo][productIndex], 
                  name: productData.name,
                  price: productData.price,
                  stock: productData.stock,
                  description: productData.description,
                  image: productData.image
              };
              console.log("[saveProduct] Producto actualizado:", products[categoryToSaveTo][productIndex]);
              Swal.fire('Actualizado', 'Producto actualizado correctamente.', 'success');
          } else {
              console.error("[saveProduct] EDICIÓN FALLIDA: Producto con ID", productData.id, "no encontrado en categoría", categoryToSaveTo);
              Swal.fire('Error', `No se pudo encontrar el producto con ID ${productData.id} en la categoría ${categoryDisplayNames[categoryToSaveTo] || categoryToSaveTo} para actualizar.`, 'error');
              return; // Detener para no proceder con el refresco si falló la búsqueda
          }
      } else { // Agregar nuevo
          const newProduct = { 
              ...productData, 
              id: Date.now().toString() 
          };
          products[categoryToSaveTo].push(newProduct);
          console.log("[saveProduct] Producto nuevo agregado con ID:", newProduct.id, "a", categoryToSaveTo);
          Swal.fire('Agregado', 'Producto agregado correctamente.', 'success');
      }
      saveProductsToStorage();
      renderCategoryProducts(); 
      hideProductForm();
  }
  
  function updateStock(productId, newStock) {
      if (newStock < 0) newStock = 0;
      console.log("[updateStock] ID:", productId, "Nuevo Stock:", newStock, "Categoría actual:", currentCategory);
      const productIndex = products[currentCategory]?.findIndex(p => p.id.toString() === productId.toString());
      console.log("[updateStock] productIndex:", productIndex);
  
      if (productIndex !== -1) {
          products[currentCategory][productIndex].stock = newStock;
          saveProductsToStorage();
          renderCategoryProducts(); 
      } else {
          console.error("[updateStock] Producto no encontrado con ID:", productId, "en categoría:", currentCategory);
      }
  }
  
  function confirmDeleteProduct(productId) {
      console.log("[confirmDeleteProduct] ID:", productId, "Categoría actual:", currentCategory);
      const product = products[currentCategory]?.find(p => p.id.toString() === productId.toString());
      console.log("[confirmDeleteProduct] Producto encontrado:", product);
      if (!product) {
          Swal.fire('Error', 'Producto no encontrado para eliminar.', 'error');
          console.error("[confirmDeleteProduct] Producto NO encontrado con ID:", productId);
          return;
      }
  
      Swal.fire({
          title: '¿Estás seguro?',
          text: `Deseas eliminar el producto "${product.name}"? Esta acción no se puede revertir.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.isConfirmed) {
              products[currentCategory] = products[currentCategory].filter(p => p.id !== productId);
              saveProductsToStorage();
              renderCategoryProducts();
              Swal.fire('Eliminado', `El producto "${product.name}" ha sido eliminado.`, 'success');
          }
      });
  }
  
  // --- NAVEGACIÓN Y RESPONSIVIDAD DEL SIDEBAR ---
  function setupSidebar() {
      const sidebar = document.getElementById('admin-sidebar');
      const mobileMenuButton = document.getElementById('admin-mobile-menu-button');
      const sidebarOverlay = document.getElementById('admin-sidebar-overlay');
  
      if (!sidebar || !mobileMenuButton || !sidebarOverlay) return;
  
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
  
      document.querySelectorAll('#admin-sidebar .nav-item').forEach(item => {
          item.addEventListener('click', function(e) {
              e.preventDefault();
              const category = this.dataset.categoryJs;
              if (category) {
                  currentCategory = category;
                  renderCategoryProducts();
                  setActiveNavItemJS(category);
  
                  if (window.innerWidth < 768) { // md breakpoint Tailwind
                      sidebar.classList.add('-translate-x-full');
                      sidebar.classList.remove('translate-x-0');
                      sidebarOverlay.classList.add('hidden');
                  }
              } else if (this.id === 'settings-link') {
                  currentCategory = 'settings'; // Manejar sección de configuración
                  renderCategoryProducts(); // Renderizará el mensaje "en desarrollo"
                  setActiveNavItemJS('settings');
                   if (window.innerWidth < 768) { 
                      sidebar.classList.add('-translate-x-full');
                      sidebar.classList.remove('translate-x-0');
                      sidebarOverlay.classList.add('hidden');
                  }
              }
          });
      });
  }
  
  // --- AUTENTICACIÓN Y LOGOUT ---
  function adminLogout() {
      localStorage.removeItem('adminLoggedIn');
      window.location.href = 'login_administradores.html';
  }
  
  function checkAdminAuth() {
      const isLoggedIn = localStorage.getItem('adminLoggedIn');
      const isOnLoginPage = window.location.pathname.endsWith('login_administradores.html');
  
      if (!isLoggedIn && !isOnLoginPage) {
          window.location.href = 'login_administradores.html';
          return false; 
      }
      if (isLoggedIn && isOnLoginPage) {
          window.location.href = 'administradores.html';
          return false; 
      }
      return true; 
  }
  
  // --- INICIALIZACIÓN DE LA APP ---
  function initializeAppAdmin() {
      if (!checkAdminAuth()) return; // Detener si la autenticación falla o redirige
  
      loadProductsFromStorage();
      setupSidebar();
  
      // Configurar listeners del formulario modal
      if (productFormElement) productFormElement.addEventListener('submit', handleProductFormSubmit);
      document.getElementById('admin-close-form-button')?.addEventListener('click', hideProductForm);
      document.getElementById('admin-cancel-form-button')?.addEventListener('click', hideProductForm);
      
      // Botón de logout
      document.getElementById('admin-logout-button')?.addEventListener('click', adminLogout);
  
      // Cargar categoría inicial y activar nav item
      renderCategoryProducts(); // currentCategory ya está seteado a 'parlantes'
      setActiveNavItemJS(currentCategory);
      
      // Hacer funciones globales si es necesario para onclick en HTML (aunque ya se migraron)
      window.showProductFormForAdd = showProductFormForAdd; 
      window.hideProductForm = hideProductForm; 
  }
  
  // Iniciar la aplicación del panel de administración
  document.addEventListener('DOMContentLoaded', initializeAppAdmin);
  