import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { Navigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [userForm, setUserForm] = useState({ name: "", password: "" });

  // Obtenemos las funciones y estados del contexto
  const { isAuthenticated, login, loading } = useAuthContext();

  // Si el usuario ya está autenticado (user existe), redirigimos.
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  // 🛑 Manejar el envío del formulario de manera ASÍNCRONA.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🛑 Llama a login pasando name y password
      await login(userForm.name, userForm.password);
      // Si es exitoso, la redirección se maneja por el 'if (isAuthenticated)'
    } catch (error) {
      // Si hay un error, muestra la alerta y limpia el formulario
      alert("Credenciales incorrectas. " + error.message);
      setUserForm({ name: "", password: "" });
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="name">Nombre de usuario:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userForm.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userForm.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Validando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
};
