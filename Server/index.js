console.log("index.js");
let express = require("express");
const cors = require('cors');

let DatabaseConnection = require("./Database/DataBaseConnection");

let url = 'mongodb://localhost:27017';

DatabaseConnection.getInstance().setUrl(url);

let app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

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
    try {
        // Hämta data från begäran
        const { lineItems, email, firstName, lastName, address1, address2, postalCode, city, country } = request.body;

        // Skapa en ny kund eller hämta en befintlig kund
        const customer = await DatabaseConnection.getInstance().createCustomer(email, firstName, lastName, address1, address2, postalCode, city, country);

        // Skapa ordern med den skapade kunden
        const orderId = await DatabaseConnection.getInstance().saveOrder(lineItems, customer.id);

        // Returnera orderns ID
        response.json({ "id": orderId });
    } catch (error) {
        console.error("Error creating order:", error);
        response.status(500).json({ error: "An error occurred while creating the order" });
    }
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
