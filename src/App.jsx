import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// Contextos
import { CartProvider } from "./context/CartContext/CartProvider";
import { AuthProvider } from "./context/AuthContext/AuthProvider"; 
// Componentes de Layouts y Rutas
import { MainLayout } from "./layouts/MainLayout"; 
import { AdminLayout } from "./layouts/AdminLayout"; 
import { RutaProtegida } from "./components/RutaProtegida/RutaProtegida"; 
import { Login } from "./components/Login/Login";

// Componentes Públicos
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/CartView/CartView";


import { Dashboard } from "./components/Admin/Dashboard"; 
import { AltaProductos } from "./components/Admin/AltaProductos"; 


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            
            <Route element={<MainLayout />}>
                <Route index element={<ItemListContainer />} /> 
                <Route path="category/:categoryName" element={<ItemListContainer />} />
                <Route path="detail/:id" element={<ItemDetailContainer />} />
                <Route path="cart" element={<CartView />} />
            </Route>
            
            <Route path="/login" element={<Login />} /> 

            {/* RUTAS PROTEGIDAS */}
            <Route 
                path="/admin" 
                element={
                    <RutaProtegida>
                        <AdminLayout />
                    </RutaProtegida>
                }
            >
               
                <Route index element={<Dashboard />} /> 
                
             
                <Route path="alta-productos" element={<AltaProductos />} /> 
            </Route>
            
            {/* RUTA 404 */}
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