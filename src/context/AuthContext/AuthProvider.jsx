import { useState } from 'react';
import { AuthContext } from "./AuthContext";

const getInitialUser = () => {
    try {
        const storedSession = sessionStorage.getItem("session");
        if (storedSession) {
            // Si la sesión existe, la parseamos y la devolvemos.
            return JSON.parse(storedSession);
        }
        return null;
    } catch (error) {
        console.error("Error leyendo sesión de sessionStorage:", error);
        return null; // En caso de error de parseo, asumimos no logueado.
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getInitialUser());
    const [loading, setLoading] = useState(false); 

    const login = (name, password) => {
        setLoading(true);
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name === "Admin" && password === "1234") { 
                    const session = { name: "Admin", role: "admin" }; 
                    
                    setUser(session);
                    sessionStorage.setItem("session", JSON.stringify(session));
                    setLoading(false);
                    resolve(session); 
                } else {
                    setLoading(false);
                    reject(new Error("Credenciales inválidas"));
                }
            }, 1000); 
        });
    };

    // 🛑 FUNCIÓN LOGOUT
    const logout = () => {
        sessionStorage.removeItem("session");
        setUser(null);
        alert("Has cerrado sesión");
    };

    const values = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        // 🛑 AJUSTE: user?.role usa encadenamiento opcional, más seguro.
        isAdmin: user?.role === "admin", 
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};