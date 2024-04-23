import { useState, useEffect } from "react";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import '../styles/admin.css';

export const Admin = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products");
                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:3000/orders");
                if (!response.ok) {
                    throw new Error(`Failed to fetch orders: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data);
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    const updateProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3000/products/${productId}`);
            if (!response.ok) {
                throw new Error(`Failed to update product: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data); 
            console.log("Product updated successfully");
            // Uppdatera din lokala produktdatabas efter framgångsrik uppdatering om det behövs
        } catch (error) {
            console.error("Error updating product:", error);
            // Hantera fel här om det behövs
        }
    }
    
    return (
        <div className="admin">
            <div className="adminProductList">
                <h3>Produktlista</h3>
                {products && products.map((product, index) => (
                    <div key={index}>
                        <h1>{product._id}</h1>
                        <p>{product.name} kr</p>
                        <p>{product.price}</p>
                        <button>Ta bort produkt</button>
                        <button onClick={() => {
                            updateProduct
                            console.log("Selected product:", product);
                        }}>
                            Redigera produkt
                        </button>
                    </div>
                ))}
                <div className="adminOrderList">
                    <h3>Orderhistorik: </h3>
                    <p>hej</p>
                    {orders && orders.map((order, index) => (
                        <div key={index}>
                            <h1>{order.customer.firstName}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
