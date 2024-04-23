import { useState, useEffect } from "react";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import '../styles/admin.css';

export const Admin = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [editedProductName, setEditedProductName] = useState<string>('');
    const [editedAmountInStock, setEditedAmountInStock] = useState<number>(0);
    const [editedPrice, setEditedPrice] = useState<number>(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products");
                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.statusText}`);
                }
                const data = await response.json();
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
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    const handleEditClick = (productId: string) => {
        setSelectedProductId(productId);
        const selectedProduct = products.find(product => product._id === productId);
        if (selectedProduct) {
            setEditedProductName(selectedProduct.name);
            setEditedAmountInStock(selectedProduct.amountInStock);
            setEditedPrice(selectedProduct.price);
        }
    }

    const handleSaveClick = async () => {
        try {
            const updatedProductData = {
                name: editedProductName,
                amountInStock: editedAmountInStock,
                price: editedPrice
            };

            const response = await fetch(`http://localhost:3000/products/${selectedProductId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProductData)
            });

            if (!response.ok) {
                throw new Error(`Failed to update product: ${response.statusText}`);
            }

            const updatedProducts = products.map(product =>
                product._id === selectedProductId ? { ...product, ...updatedProductData } : product
            );
            setProducts(updatedProducts);

            setSelectedProductId(null);
            setEditedProductName('');
            setEditedAmountInStock(0);
            setEditedPrice(0);
        } catch (error) {
            console.error("Error saving product:", error);
        }
    }
    
    return (
        <div className="admin">
            <div className="adminProductList">
                <h3>Produktlista</h3>
                {products && products.map((product, index) => (
                    <div key={index}>
                        {selectedProductId === product._id ? (
                            <div>
                                <label>Produktnamn: </label>
                                <input
                                    type="text"
                                    value={editedProductName}
                                    onChange={e => setEditedProductName(e.target.value)}
                                />
                                <label>Lager i saldo: </label>
                                <input
                                    type="text"
                                    value={editedAmountInStock}
                                    onChange={e => setEditedAmountInStock(parseInt(e.target.value))}
                                />
                                <label>Pris: </label>
                                <input
                                    type="text"
                                    value={editedPrice}
                                    onChange={e => setEditedPrice(parseFloat(e.target.value))}
                                />
                                <button onClick={handleSaveClick}>Spara</button>
                            </div>
                        ) : (
                            <div>
                                <h1>{product.name}</h1>
                                <p>Antal i lager: {product.amountInStock}</p>
                                <p>Produktpris: {product.price} kr</p>
                                <button onClick={() => handleEditClick(product._id)}>Redigera produkt</button>
                            </div>
                        )}
                    </div>
                ))}
                <button>Lägg till produkt</button>
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
