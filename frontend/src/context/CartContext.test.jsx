import React from 'react';
import { renderHook, act } from '@testing-library/react'; 
import { CartProvider, useCart } from './CartContext'; 
import Swal from 'sweetalert2';

// 1. MOCK: Simulación de SweetAlert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

// 2. MOCK: Simulación del localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// --- Producto de Prueba ---
const mockProduct = {
  id: 1, 
  name: "Parlante JBL Flip 5", 
  price: 1000, // Usamos un precio redondo para facilitar el cálculo mental en el test
  stock: 15,
  imagenUrl: "img/jblcharge.jpg",
  categoria: "Parlantes Portátiles",
};

// --- Pruebas Unitarias (Total: 8) ---

describe('CartContext - Suite Completa de 8 Tests', () => {

  // Limpiamos mocks y storage antes de cada test
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks(); 
  });

  // Helper para montar el hook
  const setupHook = (initialCart = []) => {
    localStorage.setItem('cart', JSON.stringify(initialCart));
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    return renderHook(() => useCart(), { wrapper });
  };

  test('1. Inicialización: Debería cargar el carrito vacío o desde localStorage', () => {
    const initialItem = { ...mockProduct, quantity: 3 };
    const { result } = setupHook([initialItem]);

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].id).toBe(1);
    expect(result.current.cart[0].quantity).toBe(3);
  });

  test('2. addItem: Debería agregar un producto nuevo y notificar', () => {
    const { result } = setupHook();

    act(() => {
      result.current.addItem(mockProduct, 1);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);
    expect(Swal.fire).toHaveBeenCalled();
  });

  test('3. addItem: Debería incrementar la cantidad si ya existe', () => {
    const initialItem = { ...mockProduct, quantity: 5 };
    const { result } = setupHook([initialItem]);

    act(() => {
      result.current.addItem(mockProduct, 2);
    });

    expect(result.current.cart).toHaveLength(1); 
    expect(result.current.cart[0].quantity).toBe(7); // 5 + 2 = 7
  });

  test('4. updateItemQuantity: Debería fijar una cantidad específica', () => {
    const initialItem = { ...mockProduct, quantity: 2 };
    const { result } = setupHook([initialItem]);

    act(() => {
      result.current.updateItemQuantity(mockProduct.id, 10);
    });

    expect(result.current.cart[0].quantity).toBe(10);
  });
  
  test('5. removeItem: Debería eliminar el producto del carrito', () => {
    const initialItem = { ...mockProduct, quantity: 5 };
    const { result } = setupHook([initialItem]);

    act(() => {
      result.current.removeItem(mockProduct.id);
    });

    expect(result.current.cart).toHaveLength(0);
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual([]);
  });

  test('6. updateItemQuantity: Debería eliminar si la cantidad baja a 0', () => {
    const initialItem = { ...mockProduct, quantity: 2 };
    const { result } = setupHook([initialItem]);

    act(() => {
      result.current.updateItemQuantity(mockProduct.id, 0);
    });

    expect(result.current.cart).toHaveLength(0);
  });

  // --- NUEVOS TESTS ---

  test('7. limpiarCarrito: Debería vaciar todo el carrito', () => {
    // Preparamos un carrito con datos
    const initialItem = { ...mockProduct, quantity: 5 };
    const { result } = setupHook([initialItem]);

    // Ejecutamos limpiar
    act(() => {
      result.current.limpiarCarrito();
    });

    // Verificamos que esté vacío
    expect(result.current.cart).toHaveLength(0);
  });

  test('8. getTotalPrice: Debería calcular el total monetario correctamente', () => {
    // Producto cuesta 1000. Si tenemos 3 unidades, total debe ser 3000.
    const initialItem = { ...mockProduct, quantity: 3 }; 
    const { result } = setupHook([initialItem]);

    const total = result.current.getTotalPrice();

    expect(total).toBe(3000);
  });

});