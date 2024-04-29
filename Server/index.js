console.log("index.js");
let express = require("express");
const cors = require('cors');

let DatabaseConnection = require("./Database/DataBaseConnection");

let url = 'mongodb://localhost:27017';

DatabaseConnection.getInstance().setUrl(url);

let app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());


//hämtar alla ordrar
app.get("/orders", async (request, response) => {

    let orders = await DatabaseConnection.getInstance().getAllOrders();

    response.json(orders);
}
);

//hämtar alla produkter
app.get("/products", async (request, response) => {
    let products = await DatabaseConnection.getInstance().getProducts();

    response.json(products);
}
);

//skapa order & skapar en kund?
app.post("/create-order", async (request, response) => {
    //METODO: create customer
    let orderId = await DatabaseConnection.getInstance().saveOrder(request.body.lineItems, request.body.email);

    response.json({"id": orderId});

});

//skapa och updatera en produkta
app.post("/products", async (request, response) => {

    
    let id = await DatabaseConnection.getInstance().createProduct();
    await DatabaseConnection.getInstance().updateProduct(id, request.body);

    response.json({"id": id});

});

//gå en på en specifik produkt
app.post("/products/:id", async (request, response) => {

    let id = await DatabaseConnection.getInstance().updateProduct(request.params.id, request.body);

    response.json({"id": request.params.id});

});


app.listen(3000);
