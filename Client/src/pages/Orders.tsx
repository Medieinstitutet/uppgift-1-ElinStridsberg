import { useState, useEffect } from "react";
import { Order } from "../models/Order";

export const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

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
        <div>
            
            {orders && orders.map((order, index) => (
                <div key={index}>
                    <p>hej</p>
                    <h1>{order.customer.firstName}</h1>

                   
                </div>
            ))}
        </div>
    );
};

export default Orders;