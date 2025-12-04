import React, { useState } from 'react';
import { createProduct } from '../../services/products'; 
import { uploadToImgbb } from '../../services/UploadImage'; 
import "./AltaProductos.css"; 

export const AltaProductos = () => {
    // 🛑 Estado para los datos del formulario (excepto la imagen)
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '', // Usamos string para el input y convertimos a number al enviar
        stock: '', // Usamos string para el input y convertimos a number al enviar
        category: 'ceramica', // Valor por defecto
    });
    
    // 🛑 Estado para el archivo de imagen (tipo File)
    const [file, setFile] = useState(null); 
    
    // Estado para controlar la carga y evitar envíos duplicados
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        // Guarda el objeto File que viene del input
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            alert("Por favor, selecciona una imagen.");
            return;
        }
        
        setIsSubmitting(true);
        let imageUrl = '';

        try {
            // 1. SUBIR IMAGEN A IMGBB
            alert("Subiendo imagen a ImgBB. Esto puede tardar unos segundos...");
            imageUrl = await uploadToImgbb(file);
            alert(`Imagen subida con éxito: ${imageUrl}`);
            
            // 2. PREPARAR OBJETO PARA MOCKAPI
            const finalProduct = {
                ...productData,
                // 🛑 Convertir strings de precio y stock a números
                price: Number(productData.price), 
                stock: Number(productData.stock),
                // 🛑 Agregar la URL obtenida de ImgBB
                image: imageUrl, 
            };

            // 3. CREAR PRODUCTO EN MOCKAPI
            alert("Guardando producto en MockAPI...");
            await createProduct(finalProduct);
            
            alert(`✅ Producto "${productData.name}" creado y guardado con éxito!`);
            
            // Limpiar formulario y estado
            setProductData({ name: '', description: '', price: '', stock: '', category: 'ceramica' });
            setFile(null); // Limpiar el archivo seleccionado
            e.target.reset(); // Resetea el formulario (incluido el input type="file")

        } catch (error) {
            console.error("Error al crear producto:", error);
            alert(`❌ Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="alta-productos-container">
            <h2>Alta de Nuevos Productos</h2>
            <form onSubmit={handleSubmit} className="product-form">
                
                {/* 1. Nombre */}
                <div className="form-group">
                    <label htmlFor="name">Nombre del Producto:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                {/* 2. Descripción */}
                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        rows="3"
                        required
                    />
                </div>
                
                {/* 3. Precio */}
                <div className="form-group">
                    <label htmlFor="price">Precio ($):</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                {/* 4. Stock */}
                <div className="form-group">
                    <label htmlFor="stock">Stock:</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={productData.stock}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
                
                {/* 5. Categoría */}
                <div className="form-group">
                    <label htmlFor="category">Categoría:</label>
                    <select
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="ceramica">Cerámica</option>
                        <option value="textiles">Textiles</option>
                        <option value="arte">Arte</option>
                        <option value="joyeria">Joyería</option>
                        <option value="cosmetica">Cosmética</option>
                    </select>
                </div>

                {/* 6. Imagen */}
                <div className="form-group">
                    <label htmlFor="file">Imagen del Producto:</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                    {file && <p className="file-info">Archivo seleccionado: {file.name}</p>}
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando Producto...' : 'Guardar Producto'}
                </button>
            </form>
        </div>
    );
};