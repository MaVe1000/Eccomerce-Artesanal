import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav/Nav"; 
import { Hero } from "../components/Hero/Hero";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = () => {
    return (
        <>
        <Nav />
        <Hero />
        
        <main className="main-content">
            {/* 🛑 Outlet mostrará la ruta anidada (ItemListContainer, CartView, etc.) */}
            <Outlet /> 
        </main>
        
        <Footer />
        </>
    )
}