

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));
import Swal from 'sweetalert2';
import React from 'react';
import { renderHook, act } from '@testing-library/react'; 
import { CartProvider, useCart } from './CartContext.jsx'; 


// MOCK: Simulación del localStorage (Tu carrito lo necesita)
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

// MOCK: Simulación de SweetAlert2 (Swal) (Tu función addItem lo utiliza para notificar)
global.Swal = {
  fire: jest.fn(),
};

// --- Producto de Prueba (ID único, basado en tu consolidación) ---
const mockProduct = {
  id: 1, 
  nombre: "Parlante JBL Flip 5",
  precio: 79990,
  stock: 15,
  imagenUrl: "img/jblcharge.jpg",
  categoria: "Parlantes Portátiles",
};


// --- Pruebas Unitarias para el CartContext ---

describe('CartContext CRUD Operations', () => {

  // 1. Configuración inicial para cada prueba
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks(); 
  });

  // 2. Helper para montar el hook de prueba
  const setupHook = (initialCart = []) => {
    // Precarga el carrito simulado en localStorage antes de que se inicie el Context
    localStorage.setItem('cart', JSON.stringify(initialCart));

    // Wrapper que proporciona el CartProvider
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

    return renderHook(() => useCart(), { wrapper });
  };


  test('1. Inicialización: Debería cargar el carrito desde localStorage', () => {
    const initialItem = { ...mockProduct, quantity: 3 };
    const { result } = setupHook([initialItem]);

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].id).toBe(1);
    expect(result.current.cart[0].quantity).toBe(3);
  });


  test('2. addItem: Debería agregar un producto nuevo y notificar (CREATE)', () => {
    const { result } = setupHook();

    act(() => {
      result.current.addItem(mockProduct, 1);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    expect(storedCart).toHaveLength(1);
    expect(storedCart[0].id).toBe(1);
    expect(storedCart[0].quantity).toBe(1);
    expect(Swal.fire).toHaveBeenCalled();
  });


  test('3. addItem: Debería incrementar la cantidad de un producto existente (UPDATE)', () => {
    const initialItem = { ...mockProduct, quantity: 5 };
    const { result } = setupHook([initialItem]);

    act(() => {
      result.current.addItem(mockProduct, 2);
    });

    expect(result.current.cart).toHaveLength(1); 
    expect(result.current.cart[0].quantity).toBe(7); // 5 + 2 = 7
  });


  test('4. updateItemQuantity: Debería actualizar la cantidad de un ítem (UPDATE)', () => {
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
      result.current.removeItem(mockProduct.id);
    });

    expect(result.current.cart).toHaveLength(0);
    expect(localStorage.getItem('cart')).toBe('[]');
  });

  
  test('6. updateItemQuantity: Debería eliminar el producto si la nueva cantidad es 0 (DELETE)', () => {
    const initialItem = { ...mockProduct, quantity: 2 };
    const { result } = setupHook([initialItem]);

    act(() => {
      result.current.updateItemQuantity(mockProduct.id, 0);
    });

    expect(result.current.cart).toHaveLength(0);
  });
  
});