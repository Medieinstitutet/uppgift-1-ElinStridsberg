console.log("index.js");
let express = require("express");
let DatabaseConnection = require("./Database/DataBaseConnection");

let url = 'mongodb://localhost:27017';


let dbConnection = new DatabaseConnection();
dbConnection.setUrl(url); 
let app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get("/", async (request, response) => {
    let orders = await dbConnection.getAllOrders();
    response.json(orders);
});

app.post("/create-order", async (request, response) => {
    let customer = await dbConnection.getOrCreateCustomer(request.body.email, request.body.name, request.body.address);
    let order = await dbConnection.createOrder(request.body.lineItems, customer);

    response.json(order);
});

app.listen(3000);
