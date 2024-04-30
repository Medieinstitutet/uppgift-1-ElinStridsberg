import React, { useState, useEffect, PropsWithChildren, createContext, useContext } from 'react';

export interface Product {
    _id: string,
    name: string,
    description: string,
    image: string[],  
    amountInStock: number,
    price: number,
    status: string
}
export interface CartItem {
    product: Product,
    quantity: number
}

interface ICartContext {
    cart: CartItem[],
    addToCart: (product: Product) => void
}

const initialValues = {
    cart: [],
    addToCart: () => { }
}

const CartContext = createContext<ICartContext>(initialValues)
export const useCart = () => useContext(CartContext)

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const lsData = localStorage.getItem("cart")
        return lsData ? JSON.parse(lsData) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: Product) => {
        if (!product) {
            console.error('Product is undefined');
            return;
        }
    
        console.log('Added to cart:', product.name); 
        const productAlreadyExists = cart.find(item => item.product._id === product._id);
        
        if (productAlreadyExists) {
            setCart(prevCart => 
                prevCart.map(item =>
                    item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
         } else {
            const newCartItem: CartItem = {
                product: {
                    _id: product._id,
                    name: product.name,
                    description: product.description,
                    image: product.image,
                    amountInStock:product.amountInStock,
                    price: product.price,
                    status: product.status
                },
                quantity: 1
            };
            setCart([...cart, newCartItem]);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
