import React, { useState } from "react";
import MessageComponent from "./MessageComponent";

const LoginFormBase = ({ role, title, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ usuario: "", contrasena: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearMessage = () => setMessage(null);

  const showMessage = (type, text, autoClose = true, duration = 3000) => {
    setMessage({ type, text });
    if (autoClose) setTimeout(clearMessage, duration);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.usuario.trim())
      newErrors.usuario = "El nombre de usuario/email es obligatorio.";
    if (!formData.contrasena.trim())
      newErrors.contrasena = "La contraseña es obligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fakeAuth = async () => {
    await new Promise((r) => setTimeout(r, 800)); // Simula latencia
    const { usuario, contrasena } = formData;

    const validCredentials = {
      admin: "admin@test.cl",
      importador: "impo@test.cl",
      cliente: "user@test.cl",
    };

    if (validCredentials[role] === usuario && contrasena === "123") {
      return role;
    }

    throw new Error("Credenciales incorrectas o usuario no autorizado.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessage();

    if (!validateForm()) {
      showMessage(
        "error",
        "Por favor, complete todos los campos correctamente.",
        false
      );
      return;
    }

    setIsLoading(true);

    try {
      const userRole = await fakeAuth();

      onLoginSuccess(userRole, formData.usuario);
      showMessage("success", "¡Bienvenido! Redirigiendo...", false);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      showMessage("error", error.message || "Error de autenticación.", false);
    } finally {
      setIsLoading(false);
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
          {title}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          {/** Usuario */}
          <InputField
            id="usuario"
            label="Usuario o Email"
            type="text"
            value={formData.usuario}
            onChange={handleChange}
            error={errors.usuario}
          />

          {/** Contraseña */}
          <InputField
            id="contrasena"
            label="Contraseña"
            type="password"
            value={formData.contrasena}
            onChange={handleChange}
            error={errors.contrasena}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-primary-600 text-white py-3 rounded-lg font-semibold transition duration-200 shadow-md transform hover:scale-[1.01] 
            ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-700"}`}
          >
            {isLoading ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        {role === "cliente" && (
          <p className="text-center text-gray-600 mt-6">
            ¿No tienes una cuenta?{" "}
            <span
              onClick={() => {}}
              className="text-primary-600 font-semibold cursor-pointer hover:underline"
            >
              Regístrate aquí
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

/* Subcomponente reutilizable para inputs */
const InputField = ({ id, label, type, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2" htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 ring-red-500"
            : "focus:border-primary-500 focus:ring-primary-500"
        }`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default LoginFormBase;
