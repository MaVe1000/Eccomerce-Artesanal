import { Outlet } from "react-router-dom";
import "./AdminLayout.css";

const AdminSidebar = () => {
    return (
        <div className="admin-sidebar">
            <nav>
                <h3>Menú Admin</h3>
                <a href="/admin">Dashboard</a>
                <a href="/admin/alta-productos">Alta Productos</a>
                <a href="/login">Logout (Temporal)</a> 
            </nav>
        </div>
    );
};

export const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <div className="admin-content-wrapper">
                {/* 1. Sidebar */}
                <AdminSidebar />
                
                <div className="admin-main-content">
                    <h1>Panel de Administración - Inicio</h1>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};