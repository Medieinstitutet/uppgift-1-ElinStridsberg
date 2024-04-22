console.log("index.js");
let express = require("express");
const cors = require('cors');

let DatabaseConnection = require("./Database/DataBaseConnection");

let url = 'mongodb://localhost:27017';

// let dbConnection = new DatabaseConnection();
// dbConnection.setUrl(url); 

DatabaseConnection.getInstance().setUrl(url);

let app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

app.get("/", async (request, response) => {

    let orders = await DatabaseConnection.getInstance().getAllOrders();

    response.json(orders);
}
);

app.get("/products", (request, response) => {
    response.json([
        {"id": 1, "Name": "produkt-1"}, 
        {"id": 2, "Name": "produkt-2"}
    ]);
}
);

app.post("/create-order", async (request, response) => {
    //METODO: create customer
    let orderId = await DatabaseConnection.getInstance().saveOrder(request.body.lineItems, request.body.email);

    response.json({"id": orderId});
});

app.listen(3000);
