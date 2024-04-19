import React, { useState, useEffect } from 'react';
import { Product } from '../models/Product';

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("http://localhost:3000/products");
            const data = await response.json();
            setProducts(data);
          
        };
        fetchProducts();
    }, []);

    return (
        <div>
            {products && products.map((product, index) => (
                <div key={index}>
                    <h1>{product.Name}</h1>
                    <p>{product.Description}</p>
                    <p>Price: {product.Price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
