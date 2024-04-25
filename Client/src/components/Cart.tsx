// cart.tsx
import { useEffect } from 'react';
import { CartItem, useCart } from '../models/CartContext'; 
import '../styles/cart.css';


export const Cart = () => {
    const { cart, addToCart } = useCart(); // Använd useCart här

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart: CartItem[] = JSON.parse(storedCart);
            if (parsedCart.length > 0) {
                parsedCart.forEach(item => {
                    const productAlreadyExists = cart && cart.find(cartItem => cartItem.product._id === item.product._id);
                    if (!productAlreadyExists) {
                        addToCart(item.product);
                    }
                });
            }
        }
    }, [cart, addToCart]); // Se till att inkludera cart och addToCart i beroendet för useEffect

    return (
      
        <div className='cartContent'>
            <h2 className='cartHeadline'><span>Din varukorg</span></h2>
       
            <div className='cartItems'>
            <ul>
                {cart && cart.map((cartItem, index) => (
                    <li key={index}>
                        
                     <img src={cartItem.product.image} className='cartImg'/>
                      <h4>{cartItem.product.name}</h4>  
                      <p><i>{cartItem.product.description}</i></p>
                      {/* Pris: {cartItem.product.default_price.unit_amount/100} SEK. */}
                      <p>Antal: {cartItem.quantity} st.</p> 
                      <p>Pris: {cartItem.product.price}kr</p>
                    </li>
                ))}
            </ul>
            </div>
               <button className='pay'>Gå till kassan</button>
         </div>
     
    );
};
