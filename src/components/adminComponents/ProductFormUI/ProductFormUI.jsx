export const ProductFormUI = ({
  product,
  errors,
  loading,
  onChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>Agregar producto</h2>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={onChange}
            required
            autoComplete="on"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={onChange}
            required
            autoComplete="off"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>
        <div>
          <label htmlFor="category">Categoria</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={onChange}
            required
            autoComplete="off"
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>
        <div>
          <label htmlFor="description">Descripcion:</label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={onChange}
            required
            autoComplete="off"
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          <label htmlFor="file">Imagen:</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
          {errors.file && <p className="error">{errors.file}</p>}
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </section>
  );
};