import React, { useState } from 'react';
import { useCart } from '../models/CartContext';
// import '../styles/payment.css';

export const Payment = () => {
    const checkoutItem = JSON.parse(localStorage.getItem('cart'))
    const { cart } = useCart();
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        postalCode: '',
        city: '',
        country: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Lägg till typen här
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();     
        
        const customerData = {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address1: formData.address1,
            address2: formData.address2,
            postalCode: formData.postalCode,
            city: formData.city,
            country: formData.country,
            lineItems: checkoutItem // Inkludera varukorgens innehåll här

        };
    
    
            const response = await fetch('http://localhost:3000/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customerData) // Skicka kundinformationen som JSON
            });
    
           
                const data = await response.json();
                console.log(data);
                console.log(customerData); // Flytta loggningen hit
                console.log(checkoutItem)
                // Clear cart after successful order 
      
        }
    
    

    return (
        <div className="payment">
            <h2>Din varukorg</h2>
            <ul>
                {cart.map((cartItem, index) => (
                    <li key={index}>
                        <img src={cartItem.product.image} alt={cartItem.product.name} />
                        <h4>{cartItem.product.name}</h4>
                        <p>{cartItem.product.description}</p>
                        <p>Antal: {cartItem.quantity}</p>
                        <p>Pris: {cartItem.product.price}kr</p>
                    </li>
                ))}
            </ul>


            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Förnamn" required />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Efternamn" required />
                <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="Adress" required />
                <input type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Adress" required />

                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postnummer" required />
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Stad" required />
                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Land" required />                {/* Andra input-fält */}
                <button type="submit">Betala</button>
            </form>
        </div>
    );
};
