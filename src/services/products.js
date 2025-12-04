const BAS_URL = "https://6931a26d11a8738467cfdcce.mockapi.io/products";


export const createProduct = async (product) => {
  const res = await fetch(BAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("No se pudo crear el producto");
  }
  const result = await res.json();
  return result;
};

export const getProducts = async (category) => {
  let url = BAS_URL;
  if (category) {
    url += `?category=${category}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Error al litar los productos");
  }
  const results = await res.json();
  return results;
};
// Obtener un producto por su ID
export const getProductById = async (id) => {
  const res = await fetch(`${BAS_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Error al obtener el producto");
  }

  return await res.json();
};
