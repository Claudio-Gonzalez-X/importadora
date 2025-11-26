import React, { useContext } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider, CartContext } from './CartContext';
import Swal from 'sweetalert2'; 

// 1. COMPONENTE DUMMY PARA CONSUMIR EL CONTEXTO
const TestComponent = () => {
  const { 
    cart, 
    addItem, 
    removeItem, 
    updateItemQuantity, 
    limpiarCarrito, 
    getTotalPrice,
    formatearPrecio 
  } = useContext(CartContext);

  return (
    <div>
      <div data-testid="cart-length">{cart.length}</div>
      <div data-testid="total-price">{getTotalPrice()}</div>
      <div data-testid="formatted-price">{formatearPrecio(getTotalPrice())}</div>
      
      <button onClick={() => addItem({ id: 1, name: 'Producto Test', price: 1000 }, 1)}>
        Agregar Producto
      </button>

      <button onClick={() => addItem({ id: 1, name: 'Producto Test', price: 1000 }, 1)}>
        Agregar Mismo Producto
      </button>

      {cart.map(item => (
        <div key={item.id} data-testid={`item-${item.id}`}>
          <span data-testid={`qty-${item.id}`}>{item.quantity}</span>
          <button onClick={() => removeItem(item.id)}>Eliminar</button>
          <button onClick={() => updateItemQuantity(item.id, 5)}>Fijar Cantidad 5</button>
          <button onClick={() => updateItemQuantity(item.id, 0)}>Fijar Cantidad 0</button>
        </div>
      ))}

      <button onClick={limpiarCarrito}>Vaciar Carrito</button>
    </div>
  );
};

// 2. SUITE DE PRUEBAS
describe('CartContext (Lógica de Negocio)', () => {

  beforeEach(() => {
    localStorage.clear();
    spyOn(Swal, 'fire');
  });

  // CASO 1
  it('1. Inicialización: Debería cargar el carrito vacío al inicio', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
  });

  // CASO 2
  it('2. addItem: Debería agregar un producto nuevo y llamar a SweetAlert', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    fireEvent.click(screen.getByText('Agregar Producto'));
    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('1');
    });
    expect(Swal.fire).toHaveBeenCalled(); 
  });

  // CASO 3
  it('3. addItem: Debería incrementar la cantidad si el producto ya existe', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    fireEvent.click(screen.getByText('Agregar Producto'));
    fireEvent.click(screen.getByText('Agregar Mismo Producto'));
    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('1');
      expect(screen.getByTestId('qty-1').textContent).toBe('2');
    });
  });

  // CASO 4
  it('4. updateItemQuantity: Debería fijar una cantidad específica', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    fireEvent.click(screen.getByText('Agregar Producto'));
    await waitFor(() => screen.getByText('Fijar Cantidad 5'));
    fireEvent.click(screen.getByText('Fijar Cantidad 5'));
    await waitFor(() => {
      expect(screen.getByTestId('qty-1').textContent).toBe('5');
    });
  });

  // CASO 5
  it('5. removeItem: Debería eliminar el producto del carrito', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    fireEvent.click(screen.getByText('Agregar Producto'));
    await waitFor(() => screen.getByText('Eliminar'));
    fireEvent.click(screen.getByText('Eliminar'));
    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('0');
    });
  });

  // CASO 6
  it('6. updateItemQuantity: Debería eliminar si la cantidad baja a 0', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    fireEvent.click(screen.getByText('Agregar Producto'));
    await waitFor(() => screen.getByText('Fijar Cantidad 0'));
    fireEvent.click(screen.getByText('Fijar Cantidad 0'));
    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('0');
    });
  });

  // CASO 7
  it('7. limpiarCarrito: Debería vaciar todo el carrito', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    fireEvent.click(screen.getByText('Agregar Producto'));
    await waitFor(() => expect(screen.getByTestId('cart-length').textContent).toBe('1'));
    fireEvent.click(screen.getByText('Vaciar Carrito'));
    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('0');
    });
  });

  // CASO 8
  it('8. getTotalPrice: Debería calcular el total monetario correctamente', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    fireEvent.click(screen.getByText('Agregar Producto')); 
    fireEvent.click(screen.getByText('Agregar Mismo Producto'));

    await waitFor(() => {
      expect(screen.getByTestId('total-price').textContent).toBe('2000');
    });
    
    // Verificación de formato
    const precioFormateado = screen.getByTestId('formatted-price').textContent;
    expect(precioFormateado).toContain('$2.000');
  });

}); 