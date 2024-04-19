console.log("index.js");
let express = require("express");
let DatabaseConnection =require("./Database/DatabaseConnection")

let url = 'mongodb://localhost:27017';

// skapar databaseConncetion
console.log(DatabaseConnection.getInstace())
DatabaseConnection.getInstace().setUrl((url))
console.log(DatabaseConnection.getInstace())

let app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get("/", async (request, response) => {
   let orders = await DatabaseConnection.getInstace().getAllOrders()
   response.json(orders)
    }
);

app.post("/create-order", async (request, response) => {
    let customer = await DatabaseConnection.getInstace().getOrCreateCustomer(request.body.email, request.body.name, request.body.adress)  // Todo: create function
    let order = await DatabaseConnection.getInstace().createOrder(request.lineItems, customer) //TODO: create function

    response.json(order)
 
     }
     
 );
 

app.listen(3000);