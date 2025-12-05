import { useState, useEffect } from "react";
import { getProducts, deleteProduct, updateProduct } from "../../services/products";
import "./Dashboard.css";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      alert("Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      alert("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar el producto");
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const saveEdit = async () => {
    try {
      const updatedProduct = {
        ...editForm,
        price: Number(editForm.price),
        stock: Number(editForm.stock),
      };

      await updateProduct(editingId, updatedProduct);
      setProducts(
        products.map((p) => (p.id === editingId ? updatedProduct : p))
      );
      setEditingId(null);
      setEditForm({});
      alert("Producto actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el producto");
    }
  };

  const updateStock = async (id, currentStock, change) => {
    const newStock = Math.max(0, Number(currentStock) + change);
    try {
      const product = products.find((p) => p.id === id);
      const updated = { ...product, stock: newStock };
      await updateProduct(id, updated);
      setProducts(products.map((p) => (p.id === id ? updated : p)));
    } catch (error) {
      console.error("Error al actualizar stock:", error);
      alert("Error al actualizar el stock");
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Cargando productos...</div>;
  }

  return (
    <section className="dashboard-container">
      <h2>Gestión de Productos</h2>
      <p className="dashboard-subtitle">
        Total de productos: {products.length}
      </p>

      {products.length === 0 ? (
        <p className="no-products">
          No hay productos cargados. Usa el formulario para agregar productos.
        </p>
      ) : (
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-thumbnail"
                    />
                  </td>
                  <td>
                    {editingId === product.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="edit-input"
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td>
                    {editingId === product.id ? (
                      <select
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        className="edit-input"
                      >
                        <option value="ceramica">Cerámica</option>
                        <option value="textiles">Textiles</option>
                        <option value="joyeria">Joyería</option>
                        <option value="arte">Arte</option>
                        <option value="cosmetica">Cosmética</option>
                      </select>
                    ) : (
                      product.category
                    )}
                  </td>
                  <td>
                    {editingId === product.id ? (
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditChange}
                        className="edit-input edit-input-small"
                      />
                    ) : (
                      `$${product.price}`
                    )}
                  </td>
                  <td>
                    {editingId === product.id ? (
                      <input
                        type="number"
                        name="stock"
                        value={editForm.stock || 0}
                        onChange={handleEditChange}
                        className="edit-input edit-input-small"
                      />
                    ) : (
                      <div className="stock-controls">
                        <button
                          onClick={() => updateStock(product.id, product.stock || 0, -1)}
                          className="stock-btn"
                          disabled={!product.stock || product.stock === 0}
                        >
                          -
                        </button>
                        <span className="stock-value">{product.stock || 0}</span>
                        <button
                          onClick={() => updateStock(product.id, product.stock || 0, 1)}
                          className="stock-btn"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      {editingId === product.id ? (
                        <>
                          <button onClick={saveEdit} className="btn-save">
                            Guardar
                          </button>
                          <button onClick={cancelEdit} className="btn-cancel">
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(product)}
                            className="btn-edit"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="btn-delete"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};