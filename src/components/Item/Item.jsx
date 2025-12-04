
import React from 'react';
import "./Item.css";

export const Item = ({ name, price, description, imageUrl, children }) => {
  
    
    return (
        <article className="product-item">
            {/* 🛑 CORRECCIÓN DE SINTAXIS: Usar imageUrl directamente sin prefijo */}
            <img src={imageUrl} alt={name} className="product-image" /> 
            
            <h2 className="product-title">{name}</h2>
            <p>Descripción: {description}</p>
            <p>Precio: ${price}</p>
            
            {children}
        </article>
    );
};