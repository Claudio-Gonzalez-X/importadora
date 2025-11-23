import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MessageComponent from "../components/MessageComponent";

const RegisterView = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "usuario",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearMessage = () => setMessage(null);
  const showMessage = (type, text, autoClose = true, duration = 3000) => {
    setMessage({ type, text });
    if (autoClose) setTimeout(clearMessage, duration);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword)
      return "Por favor completa todos los campos.";
    if (formData.password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres.";
    if (formData.password !== formData.confirmPassword)
      return "Las contraseñas no coinciden.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessage();

    const errorMsg = validateForm();
    if (errorMsg) {
      showMessage("error", errorMsg);
      return;
    }

    try {
      setLoading(true);
      await register(formData.email, formData.password, formData.role);
      showMessage("success", "Registro exitoso. Redirigiendo...");

      const role = formData.role;
      if (role === "admin") navigate("/admin");
      else if (role === "importador") navigate("/panel");
      else navigate("/");

    } catch (error) {
      console.error(error);
      showMessage("error", error.message || "No se pudo registrar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
      {message && (
        <MessageComponent type={message.type} text={message.text} onClose={clearMessage} />
      )}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-primary-700 text-center mb-6 border-b pb-3">
          Registro de Usuario
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-primary-500 focus:ring-primary-500"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-primary-500 focus:ring-primary-500"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-primary-500 focus:ring-primary-500"
              placeholder="Repita la contraseña"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Tipo de usuario</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="usuario">Comprador</option>
              <option value="importador">Importador</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary-500 text-white py-3 rounded-lg font-semibold hover:bg-secondary-600 transition duration-200 shadow-md transform hover:scale-[1.01]"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary-600 font-semibold cursor-pointer hover:underline"
          >
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;
