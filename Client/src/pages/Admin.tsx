// Importera useState och useEffect från "react" biblioteket
import { useState, useEffect } from "react";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import '../styles/admin.css';
import { Cart } from "../components/Cart";

export const Admin = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
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
                // console.log(data)
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
//order.lineItems, ser du till att lineItems faktiskt innehåller data när det renderas. Du kan också kolla om lineItem.product innehåller data och att den har en name-egenskap.
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
            setProducts(updatedProductsData);

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
            setProducts(updatedProductsData);

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

    const safeOutput = (text) => {
        if (text === null || typeof text !== "object") {
            return text;
        }

        return JSON.stringify(text);
    };

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

            {productAddedMessage && <p>Produkten har lagts till!</p>}

            <h2 className="orderName">Orderhistorik: </h2>
            <div className="order">
                {orders.map((order, index) => (
                    <div key={index} className="perOrder">
                        <p><b>Orderid: </b>{safeOutput(order._id)}</p>
                        <p> <b>Email: </b>{order.linkedCustomer._id}</p>
                        <p><b>Orderdatum: </b>{safeOutput(order.orderDate)}</p>
                      

                        <h4>Produkter: </h4>
                        <ul>
 {/* {console.log("Line Items:", order.lineItems)}     */}
 
 {order.lineItems.map((lineItem, lineIndex) => (
        <li key={lineIndex} className="lilineItems">
            {/* <p><b>Produkt: {lineItem._id}</b></p>
            <p><b>ID:</b> {safeOutput(lineItem.product._id)}</p> */}
             <p><b>Produkt: </b> {safeOutput(lineItem.product.name)}</p>
            <p><b>Antal: </b>: {safeOutput(lineItem.quantity)}</p>
            {/* <p><b>Totalt: </b> ({lineItem.product.price} *  {lineItem.quantity})  </p> */}
            {/* {console.log("test", (order.lineItems.id))}     */}
        </li>
    ))}
</ul>

                    </div>
                ))}
            </div>
        </div>
    );
}
