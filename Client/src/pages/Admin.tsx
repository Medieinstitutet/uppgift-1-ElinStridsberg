// Importera useState och useEffect från "react" biblioteket
import { useState, useEffect } from "react";
import { Product } from "../models/Product";
import {  Order } from "../models/Order";
import '../styles/admin.css';
import { Cart } from "../components/Cart";

export const Admin = () => {


    
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    // const [customer, setCustomer] = useState<Customer[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [editedProductName, setEditedProductName] = useState<string>('');
    const [editedAmountInStock, setEditedAmountInStock] = useState<number>(0);
    const [editedPrice, setEditedPrice] = useState<number>(0);
    const [showAddProductForm, setShowAddProductForm] = useState<boolean>(false);
    const [newProductName, setNewProductName] = useState<string>('');
    const [newAmountInStock, setNewAmountInStock] = useState<number>(0);
    const [newPrice, setNewPrice] = useState<number>(0);
    const [productAddedMessage, setProductAddedMessage] = useState<boolean>(false);

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
                console.log(data)
                
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

            const updatedProductsResponse = await fetch("http://localhost:3000/products");
            const updatedProductsData = await updatedProductsResponse.json();
            setProducts(updatedProductsData); // Uppdatera produktlistan i state med den nya datan

            setSelectedProductId(null);
            setEditedProductName('');
            setEditedAmountInStock(0);
            setEditedPrice(0);
            console.log("Produkten har uppdaterats!");
        } catch (error) {
            console.error("Error saving product:", error);
        }
    }

    const addProduct = () => {
        setShowAddProductForm(true);
    }

    const handleAddProductClick = async () => {
        try {
            const newProductData = {
                name: newProductName,
                amountInStock: newAmountInStock,
                price: newPrice
            };

            const response = await fetch(`http://localhost:3000/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProductData)
            });

            if (!response.ok) {
                throw new Error(`Failed to add product: ${response.statusText}`);
            }

            const updatedProductsResponse = await fetch("http://localhost:3000/products");
            const updatedProductsData = await updatedProductsResponse.json();
            setProducts(updatedProductsData); // Uppdatera produktlistan i state med den nya datan

            setShowAddProductForm(false);

            setNewProductName('');
            setNewAmountInStock(0);
            setNewPrice(0);

            console.log("Produkten har lagts till!");
            setProductAddedMessage(true);
            setTimeout(() => {
                setProductAddedMessage(false);
            }, 3000);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

   // För att kontrollera lineItems innehåll innan renderingen
   console.log(orders); // Logga orders utanför return-instruktionen för att kontrollera dess innehåll

    return (
        <div className="admin">
              <h2>Produktlista</h2>
            <div className="adminProductList">
              
                {Array.isArray(products) && products.map((product, index) => (
                    <div key={index} className="product">
                        {selectedProductId === product._id ? (
                            <div>
                                <h6 className="productName">Produktnamn: </h6>
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
                                <img src={product.image} alt="" />
                                <h1>{product.name}</h1>
                                <p>Antal i lager: {product.amountInStock}</p>
                                <p>Produktpris: {product.price} kr</p>
                                <button onClick={() => handleEditClick(product._id)} className="editProduct">Redigera produkt</button>
                            </div>
                        )}
                    </div>
                ))}

                {showAddProductForm && (
                    <div>

                        <label>Produktnamn: </label>
                        <input
                            type="text"
                            value={newProductName}
                            onChange={e => setNewProductName(e.target.value)}
                        />
                        <label>Lager i saldo: </label>
                        <input
                            type="text"
                            value={newAmountInStock}
                            onChange={e => setNewAmountInStock(parseInt(e.target.value))}
                        />
                        <label>Pris: </label>
                        <input
                            type="text"
                            value={newPrice}
                            onChange={e => setNewPrice(parseFloat(e.target.value))}
                        />
                        <button onClick={handleAddProductClick}>Spara</button>
                    </div>
                )}
                </div>
                <button onClick={addProduct} className="addProduct">Lägg till produkt</button>

                {/* Visa meddelande om att produkten har lagts till */}
                {productAddedMessage && <p>Produkten har lagts till!</p>}
            
                <h2 className="orderName">Orderhistorik: </h2>
            <div className="order">
                {orders && orders.map((order, index) => (
                    <div key={index} className="oneOrder">
                        <h3>Orderid: {order._id}</h3>
                        <p>orderDate: {order.orderDate}</p>
                        <p>TotalPrice: {order.totalPrice}</p>
                     
                      
                        {/* Kontrollera om det finns en kund kopplad till ordern innan du försöker visa dess egenskaper */}
                        {order.customer.length > 0 && (
                            <p>Kund: {order.customer[0]._id}</p>
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
                            ))}
                 </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
