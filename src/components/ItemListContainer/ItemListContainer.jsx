import { useState, useEffect } from "react";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("https://6931a26d11a8738467cfdcce.mockapi.io/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Hubo un problema al cargar los productos");
        }
        return res.json();
      })
      .then((data) => {
        if (categoryName) {
          const filteredData = data.filter(
            (prod) => prod.category === categoryName
          );
          setProducts(filteredData);
        } else {
          setProducts(data); 
        }
      })
      .catch((err) => {
        console.error("Error al cargar o filtrar productos:", err);
        setProducts([]); 
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [categoryName]);

  const title = categoryName
    ? `Categoría: ${
        categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
      }`
    : "Bienvenidos a Nuestra Tienda de Artesanías";

  return (
    <section className="item-list-container">
      <h2>{title}</h2>
      <p>
        {categoryName
          ? "Explora nuestros productos seleccionados."
          : "Explora nuestra colección única de productos artesanales hechos a mano con amor y dedicación."}
      </p>
      {loading ? <p>Cargando productos...</p> : <ItemList list={products} />}
    </section>
  );
};
