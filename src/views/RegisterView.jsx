import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterView = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    usuario: '',
    contrasena: '',
    confirmarContrasena: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }

  const clearMessage = () => setMessage(null);
  const showMessage = (type, text, autoClose = true, duration = 3000) => {
    setMessage({ type, text });
    if (autoClose) {
      setTimeout(clearMessage, duration);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (formData.nombre.trim() === '') {
      newErrors.nombre = 'El nombre es obligatorio.';
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Debe ser un email válido.';
      isValid = false;
    }
    if (formData.usuario.trim() === '') {
      newErrors.usuario = 'El nombre de usuario es obligatorio.';
      isValid = false;
    }
    if (formData.contrasena.length < 6) {
      newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres.';
      isValid = false;
    }
    if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = 'Las contraseñas no coinciden.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearMessage();

    if (validateForm()) {
      try {
        // Usando localStorage como simulación de base de datos
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        
        // Verificar si el usuario o email ya existe
        const userExists = usuarios.some(
          u => u.usuario === formData.usuario || u.email === formData.email
        );

        if (userExists) {
          showMessage('error', 'El email o usuario ya está registrado.', true, 4000);
          return;
        }

        // Crear nuevo usuario
        const nuevoUsuario = {
          nombre: formData.nombre,
          email: formData.email,
          usuario: formData.usuario,
          contrasena: formData.contrasena, // En un entorno real se debe hashear
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        showMessage('success', 'Registro exitoso. ¡Inicia sesión!', false);
        
        setTimeout(() => {
          clearMessage();
          navigate('/login'); // Redirigir a Login
        }, 1500);

      } catch (error) {
        console.error("Error al registrar:", error);
        showMessage('error', 'Error de Sistema: No se pudo completar el registro.', true);
      }
    } else {
      showMessage('error', 'Por favor, corrija los errores en el formulario.', false);
    }
  };
  
  // Componente de Mensaje (reutilizado)
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


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
      
      {message && <MessageComponent type={message.type} text={message.text} onClose={clearMessage} />}

      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-primary-700 text-center mb-6 border-b pb-3">
          Registro de Usuario
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.nombre ? 'border-red-500 ring-red-500' : 'focus:border-primary-500 focus:ring-primary-500'}`}
              placeholder="Ej: Juan Pérez"
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-500' : 'focus:border-primary-500 focus:ring-primary-500'}`}
              placeholder="ejemplo@correo.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Usuario */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="usuario">Nombre de Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.usuario ? 'border-red-500 ring-red-500' : 'focus:border-primary-500 focus:ring-primary-500'}`}
              placeholder="UsuarioÚnico"
            />
            {errors.usuario && <p className="text-red-500 text-sm mt-1">{errors.usuario}</p>}
          </div>

          {/* Contraseña */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.contrasena ? 'border-red-500 ring-red-500' : 'focus:border-primary-500 focus:ring-primary-500'}`}
              placeholder="Mínimo 6 caracteres"
            />
            {errors.contrasena && <p className="text-red-500 text-sm mt-1">{errors.contrasena}</p>}
          </div>
          
          {/* Confirmar Contraseña */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmarContrasena">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmarContrasena"
              name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmarContrasena ? 'border-red-500 ring-red-500' : 'focus:border-primary-500 focus:ring-primary-500'}`}
              placeholder="Repita la contraseña"
            />
            {errors.confirmarContrasena && <p className="text-red-500 text-sm mt-1">{errors.confirmarContrasena}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-secondary-500 text-white py-3 rounded-lg font-semibold hover:bg-secondary-600 transition duration-200 shadow-md transform hover:scale-[1.01]"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿Ya tienes una cuenta? <span 
            onClick={() => navigate('/login')} 
            className="text-primary-600 font-semibold cursor-pointer hover:underline transition duration-150">
            Inicia Sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;