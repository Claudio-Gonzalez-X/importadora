import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componente principal de la vista de Login
const LoginView = () => {
  // Configuración de useNavigate
  const navigate = useNavigate();

  // 1. Estado para los campos del formulario
  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: '',
  });

  // 2. Estado para manejar los errores de validación
  const [errors, setErrors] = useState({});

  // 3. Estado para manejar mensajes de éxito/error
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }
  
  const clearMessage = () => setMessage(null);
  
  const showMessage = (type, text, autoClose = true, duration = 3000) => {
    setMessage({ type, text });
    if (autoClose) {
      setTimeout(clearMessage, duration);
    }
  };

  // Manejador genérico de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar errores mientras el usuario escribe
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  // Función de validación
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (formData.usuario.trim() === '') {
      newErrors.usuario = 'El nombre de usuario/email es obligatorio.';
      isValid = false;
    }
    if (formData.contrasena.trim() === '') {
      newErrors.contrasena = 'La contraseña es obligatoria.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Manejador del envío del formulario (Lógica de Login)
  const handleSubmit = (e) => {
    e.preventDefault();
    clearMessage();

    if (validateForm()) {
      const { usuario, contrasena } = formData;
      
      try {
        // Usando localStorage como simulación de base de datos
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        
        // 4. Buscar el usuario por nombre de usuario o email
        const userFound = usuarios.find(
          u => (u.usuario === usuario || u.email === usuario) && u.contrasena === contrasena
        );

        if (userFound) {
          // Guardar estado de sesión (simulación)
          localStorage.setItem('currentUser', JSON.stringify({ 
            id: userFound.email, // Usamos el email como identificador simple
            nombre: userFound.nombre,
            usuario: userFound.usuario 
          }));

          // Notificación de éxito y redirección a Home
          showMessage('success', `¡Bienvenido, ${userFound.nombre}!`, false);
          
          setTimeout(() => {
            clearMessage();
            navigate('/'); // Redirigir a la página de inicio
          }, 1500);

        } else {
          showMessage('error', 'Credenciales incorrectas. Verifique su usuario y contraseña.', true);
        }

      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        showMessage('error', 'Error de Sistema: No se pudo iniciar sesión.', true);
      }
    } else {
      showMessage('error', 'Por favor, complete todos los campos correctamente.', false);
    }
  };

  // Componente de Mensaje
  const MessageComponent = ({ type, text, onClose }) => {
    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
    const Icon = () => (
        <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {type === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.3 16c-.77 1.333.192 3 1.732 3z" />
            )}
        </svg>
    );

    return (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl transition-opacity duration-300 transform ${bgColor} text-white`}>
            <div className="flex items-center">
                <Icon />
                <p className="font-semibold">{text}</p>
                {type === 'error' && (
                    <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                )}
            </div>
        </div>
    );
  }

  // Renderizado (UI)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
      
      {/* Mensajes de notificación */}
      {message && <MessageComponent type={message.type} text={message.text} onClose={clearMessage} />}

      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
        <h2 className="text-3xl font-extrabold text-primary-700 text-center mb-6 border-b pb-3">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          
          {/* Usuario/Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="usuario">Usuario o Email</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.usuario ? 'border-red-500 ring-red-500' : 'focus:border-primary-500 focus:ring-primary-500'}`}
              placeholder="Nombre de usuario o email"
            />
            {errors.usuario && <p className="text-red-500 text-sm mt-1">{errors.usuario}</p>}
          </div>

          {/* Contraseña */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.contrasena ? 'border-red-500 ring-red-500' : 'focus:border-primary-500 focus:ring-primary-500'}`}
              placeholder="Contraseña"
            />
            {errors.contrasena && <p className="text-red-500 text-sm mt-1">{errors.contrasena}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-200 shadow-md transform hover:scale-[1.01]"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿No tienes una cuenta? <span 
            // Navegación correcta al componente RegistroView
            onClick={() => navigate('/registro')} 
            className="text-primary-600 font-semibold cursor-pointer hover:underline transition duration-150">
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginView;