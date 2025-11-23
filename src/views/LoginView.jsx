import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageComponent from '../components/MessageComponent'; // ← Importado
// import { supabaseClient } from '../supabaseClient'; // opcional futuro

const LoginView = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const clearMessage = () => setMessage(null);

  const showMessage = (type, text, autoClose = true, duration = 3000) => {
    setMessage({ type, text });
    if (autoClose) setTimeout(clearMessage, duration);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.usuario.trim()) newErrors.usuario = 'El usuario/email es obligatorio.';
    if (!formData.contrasena.trim()) newErrors.contrasena = 'La contraseña es obligatoria.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearMessage();

    if (!validateForm()) {
      showMessage('error', 'Por favor llena todos los campos correctamente.', false);
      return;
    }

    try {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const user = usuarios.find(
        u =>
          (u.usuario === formData.usuario || u.email === formData.usuario) &&
          u.contrasena === formData.contrasena
      );

      if (!user) {
        showMessage('error', 'Credenciales incorrectas.', true);
        return;
      }

      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          id: user.email,
          nombre: user.nombre,
          usuario: user.usuario,
        })
      );

      showMessage('success', `¡Bienvenido, ${user.nombre}!`, false);

      setTimeout(() => {
        clearMessage();
        navigate('/');
      }, 1200);

    } catch (err) {
      console.error(err);
      showMessage('error', 'Error interno. Intente nuevamente.', true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">

      {message && (
        <MessageComponent type={message.type} text={message.text} onClose={clearMessage} />
      )}

      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
        <h2 className="text-3xl font-extrabold text-primary-700 text-center mb-6 border-b pb-3">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} noValidate>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Usuario o Email</label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                errors.usuario
                  ? 'border-red-500 ring-red-500'
                  : 'focus:border-primary-500 focus:ring-primary-500'
              }`}
              placeholder="Nombre de usuario o email"
            />
            {errors.usuario && <p className="text-red-500 text-sm mt-1">{errors.usuario}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                errors.contrasena
                  ? 'border-red-500 ring-red-500'
                  : 'focus:border-primary-500 focus:ring-primary-500'
              }`}
              placeholder="Contraseña"
            />
            {errors.contrasena && <p className="text-red-500 text-sm mt-1">{errors.contrasena}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-200 shadow-md hover:scale-[1.01]"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿No tienes una cuenta?{' '}
          <span
            onClick={() => navigate('/registro')}
            className="text-primary-600 font-semibold cursor-pointer hover:underline"
          >
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
