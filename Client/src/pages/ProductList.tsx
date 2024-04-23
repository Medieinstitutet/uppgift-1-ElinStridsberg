import { useState, useEffect } from 'react';
import { Product } from '../models/Product';

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("http://localhost:3000/products");
            const data = await response.json();
           console.log(data)
            setProducts(data);
          
        };
        fetchProducts();
    }, []);

    return (
        <div>
            {products && products.map((product, index) => (
                <div key={index}>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>{product.price} kr</p>
                    <button>Köp </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
