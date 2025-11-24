import React from 'react';
import { renderHook, act } from '@testing-library/react'; 
import { CartProvider, useCart } from './CartContext'; 
import Swal from 'sweetalert2';

// 1. MOCK: Simulación de SweetAlert2
// Esto evita que la ventana de alerta real intente abrirse durante el test
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

// 2. MOCK: Simulación del localStorage
// Aunque Jest a veces lo trae, definirlo asegura que no falle en ningún entorno
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
  name: "Parlante JBL Flip 5", // Ajustado a 'name' según tu Contexto
  price: 79990, // Ajustado a 'price' según tu Contexto
  stock: 15,
  imagenUrl: "img/jblcharge.jpg",
  categoria: "Parlantes Portátiles",
};

// --- Pruebas Unitarias ---

describe('CartContext - Pruebas Avanzadas (CRUD)', () => {

  // Limpiamos mocks y storage antes de cada test para que sean independientes
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks(); 
  });

  // Helper para montar el hook envuelto en el Provider
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

  test('2. addItem: Debería agregar un producto nuevo y llamar a Swal (CREATE)', () => {
    const { result } = setupHook();

    // Usamos 'act' porque esto cambia el estado de React
    act(() => {
      // Usamos el alias 'addItem' que definiste en tu Context
      result.current.addItem(mockProduct, 1);
    });

    // Verificaciones
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);
    
    // Verificar persistencia en localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    expect(storedCart).toHaveLength(1);
    
    // Verificar que se llamó a la alerta
    expect(Swal.fire).toHaveBeenCalled();
  });

  test('3. addItem: Debería incrementar la cantidad si ya existe (UPDATE)', () => {
    const initialItem = { ...mockProduct, quantity: 5 };
    const { result } = setupHook([initialItem]);

    act(() => {
      result.current.addItem(mockProduct, 2);
    });

    expect(result.current.cart).toHaveLength(1); 
    expect(result.current.cart[0].quantity).toBe(7); // 5 + 2 = 7
  });

  test('4. updateItemQuantity: Debería fijar una cantidad específica (UPDATE)', () => {
    const initialItem = { ...mockProduct, quantity: 2 };
    const { result } = setupHook([initialItem]);

    act(() => {
      result.current.updateItemQuantity(mockProduct.id, 10);
    });

    expect(result.current.cart[0].quantity).toBe(10);
  });
  
  test('5. removeItem: Debería eliminar el producto del carrito (DELETE)', () => {
    const initialItem = { ...mockProduct, quantity: 5 };
    const { result } = setupHook([initialItem]);

    act(() => {
      // Usamos el alias 'removeItem'
      result.current.removeItem(mockProduct.id);
    });

    expect(result.current.cart).toHaveLength(0);
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual([]);
  });

  test('6. updateItemQuantity: Debería eliminar si la cantidad baja a 0 (DELETE Lógico)', () => {
    const initialItem = { ...mockProduct, quantity: 2 };
    const { result } = setupHook([initialItem]);

    act(() => {
      result.current.updateItemQuantity(mockProduct.id, 0);
    });

    expect(result.current.cart).toHaveLength(0);
  });
});