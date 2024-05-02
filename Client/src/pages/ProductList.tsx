import { useState, useEffect } from 'react';
import { Product } from '../models/Product';
// import { CartItem, useCart } from '../models/CartContext';
import { useCart } from '../models/CartContext';

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    // const [cartItems, setCartItems] = useState<CartItem[]>([]); // Använd [] istället för {}
    const { cart, addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("http://localhost:3000/products");
            const data = await response.json();
            setProducts(data);
            // console.log(data)
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
                    <button onClick={() => addToCart(product)} className='buy'>Köp</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
