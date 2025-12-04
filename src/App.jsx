import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// Contextos
import { CartProvider } from "./context/CartContext/CartProvider";
import { AuthProvider } from "./context/AuthContext/AuthProvider"; 
// Componentes de Layouts y Rutas
import { MainLayout } from "./layouts/MainLayout"; // Layout para rutas públicas
import { AdminLayout } from "./layouts/AdminLayout"; // Layout para rutas de admin
import { RutaProtegida } from "./components/RutaProtegida/RutaProtegida"; 
import { Login } from "./components/Login/Login";
// Componentes de Vistas
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/CartView/CartView";



// Componentes de ejemplo para las Rutas de Admin
const AdminPanel = () => <h2 style={{ padding: '80px', color: '#a0522d', textAlign: 'center' }}>Panel de Administración - Inicio</h2>;
const AltaProductos = () => <h2 style={{ padding: '80px', color: '#a0522d', textAlign: 'center' }}>Formulario de Alta de Productos</h2>;


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            
            {/* 1. GRUPO DE RUTAS PÚBLICAS (Con MainLayout) */}
            {/* Las rutas anidadas heredarán el MainLayout y se renderizarán en su <Outlet /> */}
            <Route element={<MainLayout />}>
                <Route index element={<ItemListContainer />} /> 
                <Route path="category/:categoryName" element={<ItemListContainer />} />
                <Route path="detail/:id" element={<ItemDetailContainer />} />
                <Route path="cart" element={<CartView />} />
            </Route>
            
            {/* 2. RUTA DE LOGIN (Sin Nav ni Hero, solo con el componente Login) */}
            <Route path="/login" element={<Login />} /> 

            {/* 3. GRUPO DE RUTAS DE ADMINISTRACIÓN (Protegidas y con AdminLayout) */}
            <Route 
                path="/admin" 
                element={
                    <RutaProtegida>
                        <AdminLayout />
                    </RutaProtegida>
                }
            >
                {/* Rutas anidadas dentro de /admin */}
                <Route index element={<AdminPanel />} /> {/* Coincide con /admin */}
                <Route path="alta-productos" element={<AltaProductos />} /> {/* Coincide con /admin/alta-productos */}
            </Route>
            
            {/* RUTA 404 (Debe ser la última para atrapar cualquier URL no coincidente) */}
            <Route 
                path="*" 
                element={
                    <h2 className="error-404-message">
                        404 | ¡Ups! No encontramos esta página.
                    </h2>
                }
            />
            
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;