
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Swal from 'sweetalert2';

const CartView = () => {
  const { cart, getTotalPrice, limpiarCarrito, formatearPrecio, getTotalItems } = useCart();
  
  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  
  // Costo de envío
  const shippingCost = subtotal > 0 ? 5000 : 0;
  const totalPagar = subtotal + shippingCost;

  const handleCheckout = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito Vacío',
        text: 'Tu carrito está vacío. Agrega productos antes de proceder al pago.',
        confirmButtonColor: '#0ea5e9',
      });
      return;
    }
    
    // Simulación del proceso de checkout (migrado de carrito.html)
    Swal.fire({
      icon: 'info',
      title: '¡Gracias por tu compra!',
      text: `Total pagado: ${formatearPrecio(totalPagar)}. Serás redirigido.`,
      confirmButtonColor: '#0ea5e9',
      willClose: () => {
          limpiarCarrito();
      }
    });
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-[60vh]">
        <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Tu Carrito Está Vacío</h2>
        <Link to="/parlantes" className="btn-primary inline-flex">
          <i className="fas fa-arrow-left mr-2"></i>
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-b pb-4">Carrito de Compras ({totalItems} items)</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Lista de Ítems */}
        <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-lg">
          <div className="hidden sm:flex items-center border-b pb-3 mb-3 font-semibold text-gray-500 text-sm">
            <span className="w-1/2">Producto</span>
            <span className="w-1/6 text-center">Precio Unitario</span>
            <span className="w-1/6 text-center">Cantidad</span>
            <span className="w-1/6 text-right">Subtotal</span>
            <span className="w-auto ml-4"></span>
          </div>
          
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className="flex justify-between mt-6 pt-4 border-t">
            <Link to="/parlantes" className="btn-outline">
              <i className="fas fa-arrow-left mr-2"></i> Continuar Comprando
            </Link>
            <button onClick={limpiarCarrito} className="btn-outline text-red-600 border-red-300 hover:bg-red-50">
              <i className="fas fa-trash-alt mr-2"></i> Vaciar Carrito
            </button>
          </div>
        </div>

        {/* Resumen de Compra */}
        <aside className="lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-lg sticky top-[100px]">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Resumen del Pedido</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{formatearPrecio(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Costo de Envío</span>
                <span>{formatearPrecio(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold pt-3 border-t">
                <span>Total a Pagar</span>
                <span>{formatearPrecio(totalPagar)}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="btn-primary w-full text-lg shadow-xl">
              <i className="fas fa-credit-card mr-2"></i> Proceder al Pago
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartView;