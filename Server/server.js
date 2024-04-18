const mongodb = require("mongodb"); // Glömde importen
const express = require("express");

const dbRouter = require("./Database/Database.router");
const { makeOrder } = require("./Database/Database.controller");
const app = express();

app.get("/products", (request, response) => {
    const url = 'mongodb://localhost:27017';
    const client = new mongodb.MongoClient(url);

    client.connect().then(() => {
        console.log("connected");

        const db = client.db('shop');
        const collection = db.collection('Product');

        return collection.find({}).toArray().then((results) => {
            console.log("Found", results);
            response.json(results);
        });

    }).finally(() => {
        client.close();
    })
});

app.get("/orders", (request, response) => {
    const url = 'mongodb://localhost:27017';
    const client = new mongodb.MongoClient(url);

    client.connect().then(() => {
        console.log("connected");

        const db = client.db('shop');
        const collection = db.collection('Order');

        return collection.find({}).toArray().then((results) => {
            console.log("Found", results);
            response.json(results);
        });

    }).finally(() => {
        client.close();
    })
});

const result =  makeOrder();
        console.log(result);

app.listen(3000, () => {
    console.log("Server is up and running...");
});
