import { useState, useEffect } from "react";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import '../styles/admin.css';
// import "./styles/admin.css"; // Använd .css eller .scss beroende på filtyp

export const Admin = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("http://localhost:3000/products");
            const data = await response.json();
            console.log(data)
            setProducts(data);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch("http://localhost:3000/orders");
            const data = await response.json();
            console.log(data)
            setOrders(data);
        };
        fetchOrders();
    }, []);

    return (
        <div className="admin">
        <div className="adminProductList">
            {/* Visa produktlistan */}
            <h3>Produktlista</h3>
            {products && products.map((product, index) => (
                <div key={index}>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>{product.price} kr</p>
                    <button>Ta bort produkt</button>
                    <button>Redigera produkt</button>
                </div>
            ))}
    
            {/* Knapp för att lägga till produkt */}
            <button>Lägg till produkt</button>
    
            {/* Visa orders */}
            <div className="adminOrderList">
                <h3>Orderhistorik: </h3>
                <p>hej</p>
                {orders && orders.map((order, index) => (
                    <div key={index}>
                        <h1>{order.customer.firstName}</h1>
                        {/* Lägg till ytterligare orderinformation här om det behövs */}
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}
