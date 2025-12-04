import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  // 💡 Estado inicial: el usuario es null (no logueado)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga al loguear

  // 🛑 FUNCIÓN LOGIN: Simulación básica por ahora
  const login = (name, password) => {
    setLoading(true);
    // Simulación de una llamada a API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name === "admin" && password === "1234") {
          // Si el login es exitoso, guarda la información del usuario
          const session = { name };
          setUser(session);
          sessionStorage.setItem("session", JSON.stringify(session)); // Guarda en sessionStorage
          return true;
        } else {
          reject(new Error("Credenciales inválidas"));
        }
        setLoading(false);
      }, 1000); // 1 segundo de simulación de carga
    });
  };

  // 🛑 FUNCIÓN LOGOUT: Simplemente limpia el estado del usuario
  const logout = () => {
    sessionStorage.removeItem("session"); // Elimina de sessionStorage
    setUser(null);
    alert("Has cerrado sesión");
  };

  const values = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user, // Booleano simple: ¿Hay un usuario logueado?
    isAdmin: user && user.role === "admin", // Booleano: ¿Es administrador?
  };

  // Proveemos el contexto a los componentes hijos
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
