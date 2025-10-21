
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Lógica de validación migrada de login.html
const validate = (user, password) => {
    let errors = {};

    if (!user) errors.user = 'El usuario es obligatorio';
    else if (user.length < 3) errors.user = 'El usuario debe tener al menos 3 caracteres';

    if (!password) errors.password = 'La contraseña es obligatoria';
    else if (password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres';

    return errors;
};


const LoginView = () => {
    const [formData, setFormData] = useState({ usuario: '', clave: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(formData.usuario, formData.clave);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        // Lógica de Autenticación (Migración de login.html)
        try {
            const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');

            if (formData.usuario === registeredUser.usuario && 
                formData.clave === registeredUser.contrasena) 
            {
                Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido!',
                    text: `Hola ${registeredUser.nombre || 'usuario'}, has iniciado sesión.`,
                    confirmButtonColor: '#0ea5e9',
                    timer: 2000,
                    showConfirmButton: false,
                    willClose: () => {
                        navigate('/'); 
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.',
                    confirmButtonColor: '#0ea5e9',
                });
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Ocurrió un error inesperado.' });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] py-10">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} noValidate>
                    {/* Campo de Usuario */}
                    <div className="mb-4">
                        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleChange}
                            placeholder="Tu nombre de usuario"
                            className={`w-full p-3 border ${errors.usuario ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                        />
                        {errors.usuario && <p className="text-red-500 text-xs mt-1">{errors.usuario}</p>}
                    </div>

                    {/* Campo de Contraseña */}
                    <div className="mb-6">
                        <label htmlFor="clave" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            id="clave"
                            name="clave"
                            value={formData.clave}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            className={`w-full p-3 border ${errors.clave ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                        />
                        {errors.clave && <p className="text-red-500 text-xs mt-1">{errors.clave}</p>}
                    </div>

                    <button type="submit" className="btn-primary w-full py-3 text-lg">
                        <i className="fas fa-sign-in-alt mr-2"></i> Iniciar Sesión
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿No tienes cuenta? 
                    <a href="#" className="text-primary-600 hover:text-primary-700 font-medium ml-1">Regístrate aquí</a>
                </p>
            </div>
        </div>
    );
};

export default LoginView;