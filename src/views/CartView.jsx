import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartView = () => {
  const { cart, getTotalPrice, formatearPrecio, limpiarCarrito } = useCart();

  // Si el carrito está vacío
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mb-6">
          <i className="fas fa-shopping-cart text-6xl text-gray-300"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-8">¡Agrega algunos productos increíbles para comenzar!</p>
        <Link to="/productos" className="btn-primary inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1">
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Resumen de Compra</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Lista de Productos */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 space-y-4">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            {/* Botón Vaciar Carrito */}
            <div className="bg-gray-50 p-4 text-right border-t border-gray-100">
               <button 
                 onClick={limpiarCarrito}
                 className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors flex items-center justify-end gap-2 ml-auto"
               >
                 <i className="fas fa-trash"></i> Vaciar Carrito
               </button>
            </div>
          </div>
        </div>

        {/* Panel de Totales */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Total del Pedido</h3>
            
            <div className="space-y-3 mb-6 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatearPrecio(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-gray-800">Total a Pagar</span>
                <span className="text-3xl font-extrabold text-blue-600">{formatearPrecio(getTotalPrice())}</span>
              </div>
            </div>

            <Link 
              to="/pago" 
              className="w-full block text-center bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Proceder al Pago <i className="fas fa-arrow-right ml-2"></i>
            </Link>
            
            <Link to="/productos" className="block text-center mt-4 text-blue-600 hover:underline text-sm">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;