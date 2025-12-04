import { Outlet } from "react-router-dom";
import "./AdminLayout.css";

const AdminSidebar = () => {
  // 💡 Aquí debes usar <NavLink> de react-router-dom cuando lo implementes.
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
        <AdminSidebar />
        <div className="admin-main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
