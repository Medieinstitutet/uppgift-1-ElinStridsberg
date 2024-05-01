console.log("index.js");
let express = require("express");
const cors = require('cors');

let DatabaseConnection = require("./Database/DatabaseConnection");

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
    // Hämta data från begäran
    const { email, firstName, lastName, address1, address2, postalCode, city, country } = request.body;
    const lineItems = request.body.lineItems;

    console.log("Full request body:", request.body);

    // Logga ut lineItems från begäran (req.body.lineItems)
    console.log("Line items from request body:", request.body.lineItems);

    // Kör forEach på lineItems om det är en array
    if (Array.isArray(request.body.lineItems)) {
        request.body.lineItems.forEach((item, index) => {
            console.log(`Line item ${index + 1}:`, item);
        });
    } else {
        console.log("Line items are not provided as an array.");
    }
    console.log(lineItems)
    try {
        // Skapa en ny kund eller hämta en befintlig kund
        const customer = await DatabaseConnection.getInstance().createCustomer(email, firstName, lastName, address1, address2, postalCode, city, country);
        // Skapa lineitems från cartitems
        // const lineItems = checkoutItem.map(item => ({
        //     amount: item.quantity,
        //     product: item.product._id // Antag att 'product' är ID för produkten
        // }));
        // Skapa ordern med den skapade kunden och lineitems
        const orderId = await DatabaseConnection.getInstance().saveOrder(lineItems, email);
 
        // Returnera orderns ID
        response.json({ "id": orderId }); 
    } catch (error) {
        console.error("Error creating order:", error); 
        response.status(500).json({ error: "An error occurred while creating the order" });
    }
});
// app.post("/create-order", async (request, response) => {
    
//         // Hämta data från begäran
//         const {  email, firstName, lastName, address1, address2, postalCode, city, country } = request.body;
//         const {checkoutItem} = request.body
//         // Skapa en ny kund eller hämta en befintlig kund
//         const customer = await DatabaseConnection.getInstance().createCustomer(email, firstName, lastName, address1, address2, postalCode, city, country);

//         // Skapa ordern med den skapade kunden
//         // const orderId = await DatabaseConnection.getInstance().saveOrder(lineItems, email);

            
//                 let orderId = await DatabaseConnection.getInstance().saveOrder(
//                     checkoutItem,
//                     email,
            
        
//                 // Returnera orderns ID
//                 response.json({ "id": orderId })
     
//         );
//     }
// )

// });

//[10:12] Alinde Öst
// router.post("/create-order", async (req, res) => {
//     let orderId = await DatabaseConnection.getInstance().createOrder(
//       req.body.lineItems,
//       req.body.email
//     );
//     res.json({ id: orderId });
//   });

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
