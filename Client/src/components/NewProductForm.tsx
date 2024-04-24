import React, { useState } from 'react';

interface NewProductFormProps {
    onSave: (product: NewProductData) => void;
}

interface NewProductData {
    name: string;
    amountInStock: number;
    price: number;
    category: string;
}

export const NewProductForm: React.FC<NewProductFormProps> = ({ onSave }) => {
    const [newProductName, setNewProductName] = useState<string>('');
    const [newAmountInStock, setNewAmountInStock] = useState<number>(0);
    const [newPrice, setNewPrice] = useState<number>(0);
    const [newCategory, setNewCategory] = useState<string>('');

    const handleSaveClick = () => {
        const newProductData: NewProductData = {
            name: newProductName,
            amountInStock: newAmountInStock,
            price: newPrice,
            category: newCategory
        };
        onSave(newProductData);
        // Återställ formuläret efter sparande
        setNewProductName('');
        setNewAmountInStock(0);
        setNewPrice(0);
        setNewCategory('');
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Produktnamn"
                value={newProductName}
                onChange={e => setNewProductName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Lager i saldo"
                value={newAmountInStock}
                onChange={e => setNewAmountInStock(parseInt(e.target.value))}
            />
            <input
                type="number"
                placeholder="Pris"
                value={newPrice}
                onChange={e => setNewPrice(parseFloat(e.target.value))}
            />
            <input
                type="text"
                placeholder="Kategori"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
            />
            <button onClick={handleSaveClick}>Spara ny produkt</button>
        </div>
    );
};

export default NewProductForm;
