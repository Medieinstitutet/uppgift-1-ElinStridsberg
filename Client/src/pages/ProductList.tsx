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
        <div className='products'>
            {products && products.map((product, index) => (
                <div key={index} className='product'>
                    <img src={product.image} className='productImg'/>
                    <h3>{product.name}</h3>
                    <p className='description'>{product.description}</p>
                    <p>{product.price} kr</p>
                    <button className='buy'>KÖP </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
