import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MessageComponent from "../components/MessageComponent";

const LoginView = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearMessage = () => setMessage(null);
  const showMessage = (type, text, autoClose = true, duration = 3000) => {
    setMessage({ type, text });
    if (autoClose) setTimeout(clearMessage, duration);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessage();

    if (!formData.email || !formData.password) {
      showMessage("error", "Debe completar todos los campos.");
      return;
    }

    try {
      setLoading(true);
      const user = await login(formData.email, formData.password);

      // Redirigir según rol
      const role = user.user_metadata?.role || "usuario";
      if (role === "admin") navigate("/admin");
      else if (role === "importador") navigate("/panel");
      else navigate("/");

    } catch (error) {
      console.error(error);
      showMessage("error", "Email o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
      {message && (
        <MessageComponent
          type={message.type}
          text={message.text}
          onClose={clearMessage}
        />
      )}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
        <h2 className="text-3xl font-extrabold text-primary-700 text-center mb-6 border-b pb-3">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-primary-500 focus:ring-primary-500"
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-primary-500 focus:ring-primary-500"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-200 shadow-md hover:scale-[1.01]"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          ¿No tienes cuenta?{" "}
          <span
            onClick={() => navigate("/registro")}
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
