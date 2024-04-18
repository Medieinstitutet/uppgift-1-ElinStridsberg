let mongodb = require("mongodb");
let express = require("express");

let app = express();

app.get("/products", (request, response) => {
    
    let url = 'mongodb://localhost:27017';
    let client = new mongodb.MongoClient(url);

    client.connect().then(() => {
        console.log("connected");

        let db = client.db('shop');
        let collection = db.collection('Product');

            return collection.find({}).toArray().then((results) => {
                console.log("Found", results);
                response.json(results);
            });

    }).finally(() => {
        client.close();
    })
});


app.get("/orders", (request, response) => {
    
    let url = 'mongodb://localhost:27017';
    let client = new mongodb.MongoClient(url);

    client.connect().then(() => {
        console.log("connected");

        let db = client.db('shop');
        let collection = db.collection('Order');

            return collection.find({}).toArray().then((results) => {
                console.log("Found", results);
                response.json(results);
            });

    }).finally(() => {
        client.close();
    })
});

app.listen(3000);