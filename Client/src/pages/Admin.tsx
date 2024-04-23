import { useState, useEffect } from "react";
import { Product } from "../models/Product";
import { Customer, Order } from "../models/Order";
import '../styles/admin.css';

export const Admin = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [customer, setCustomer] = useState<Customer[]>([])
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
                console.log(data)
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
    const addProduct = () => {
        console.log("lägg till produkt")
        return <></>
    }
    
    return (
        <div className="admin">
            <div className="adminProductList">
                <h2>Produktlista</h2>
                {products && products.map((product, index) => (
                    <div key={index} className="product">
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
               
                <button onClick={addProduct}>Lägg till produkt</button>
                <div className="adminOrderList">
    <h3>Orderhistorik: </h3>
    <div className="order">
    {orders && orders.map((order, index) => (
        <div key={index}>
            <h3>Orderid: {order._id}</h3>
            <p>orderDate: {order.orderDate}</p>
            <p>TotalPrice: {order.totalPrice}</p>
            <p>paymentId: {order.paymentId}</p>
            {/* Kontrollera om det finns en kund kopplad till ordern innan du försöker visa dess egenskaper */}
            {order.customer.length > 0 && (
                <p>Status: {order.customer[0]._id}</p>
            )}
            <div>
    <h4>Produkter i ordern:</h4>
    {order.lineItems.map((lineItem, itemIndex) => (
        <div key={itemIndex}>
            {lineItem.product && (
                <>
                    <p>Produkt: {lineItem.product.name}</p>
                    <p>Antal: {lineItem.amount}</p>
                    <p>Totalpris: {lineItem.totalPrice}</p>
                </>
            )}
        </div>
        
    ))}<hr></hr>
</div></div>

        
    ))}

</div></div>
</div></div>
)}
