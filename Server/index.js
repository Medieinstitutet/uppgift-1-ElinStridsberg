console.log("index.js");
let express = require("express");
let mongodb = require("mongodb");
let DatabaseConnection = require("./Database/DataBaseConnection");
const cors = require('cors');

let url = 'mongodb://localhost:27017';


let dbConnection = new DatabaseConnection();
dbConnection.setUrl(url); 

let app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.get("/", async (request, response) => {
    let orders = await dbConnection.getAllOrders();
    response.json(orders);
});

app.get("/products", (request, response) => {
    
    let url = 'mongodb://localhost:27017';
    let client = new mongodb.MongoClient(url);

    client.connect().then(() => {
        console.log("connected");

        let db = client.db('shop');
        let collection = db.collection('products');

            return collection.find({}).toArray().then((results) => {
                console.log("Found", results);
                response.json(results);
            });

    }).finally(() => {
        client.close();
    })
});

app.post("/create-order", async (request, response) => {
    let customer = await dbConnection.getOrCreateCustomer(request.body.email, request.body.name, request.body.address);
    let order = await dbConnection.createOrder(request.body.lineItems, customer);

    response.json(order);
});

app.listen(3000);
