// cart.tsx
import { useEffect } from 'react';
import { CartItem, useCart } from '../models/CartContext'; // Importera useCart här

export const Cart = () => {
    const { cart, addToCart } = useCart(); // Använd useCart här

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart: CartItem[] = JSON.parse(storedCart);
            if (parsedCart.length > 0) {
                parsedCart.forEach(item => {
                    const productAlreadyExists = cart && cart.find(cartItem => cartItem.product.id === item.product.id);
                    if (!productAlreadyExists) {
                        addToCart(item.product);
                    }
                });
            }
        }
    }, [cart, addToCart]); // Se till att inkludera cart och addToCart i beroendet för useEffect

    return (
        <div className='cartContent'>
            <h2>Varukorg</h2>
            <hr className='hr'></hr>
       
            <div className='cartItems'>
            <ul>
                {cart && cart.map((cartItem, index) => (
                    <li key={index}>
                        
                     <img src={cartItem.product.image} className='cartImg'/>
                      <h6>{cartItem.product.name}</h6>  
                      {/* Pris: {cartItem.product.default_price.unit_amount/100} SEK. */}
                      <p>Antal: {cartItem.quantity} st.</p> 
                    </li>
                ))}
            </ul>
            </div>
               
         </div>
     
    );
};
