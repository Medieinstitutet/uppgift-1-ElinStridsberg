const { MongoClient } = require("mongodb");

const makeOrder = async () => {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected to database");

        const db = client.db('shop');
        const collection = db.collection('Order');

        await collection.insertMany([{FirstName: "Elin", LastName: "Stridsberg"}]);
        console.log("Inserted");
        console.log("Order added to database");

        return { message: 'Order created successfully' };
    } catch (error) {
        console.error("Error:", error);
        return { error: 'Failed to create order' };
    } finally {
        await client.close();
    }
}

module.exports = { makeOrder };
