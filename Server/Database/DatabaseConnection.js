const mongodb = require("mongodb");

let instance = null;

const DatabaseConnection = class {
  constructor() {
    this.url = null;
  }

  setUrl(url) {
    this.url = url;
  }

  async connect() {
    if (this.client) {
      return;
    }
    this.client = new mongodb.MongoClient(this.url);

    await this.client.connect();
  }
  async saveOrder(lineItems, customer) {
    await this.connect();
  
    let db = this.client.db("shop");
    let orderCollection = db.collection("orders");
  
    let orderResult = await orderCollection.insertOne({
      "customer": customer,
      "orderDate": new Date(),
      "status": "unpaid",
      "totalPrice": 0,
      "paymentId": null,
      "lineItems": [] 
    });
  
    let orderId = orderResult.insertedId;
  
    let lineItemsCollection = db.collection("lineItems");
  for (let lineItem of lineItems) {  
  let totalPrice = lineItem.product.price * lineItem.quantity;
  let encodedLineitem = {
    "quantity": lineItem.quantity,
    "totalPrice": totalPrice,
    "order": orderId,
    "product": lineItem.product,
    // "productName": lineItem.product.name // Lägg till namnet på produkten här
  };

  console.log("Total price:", totalPrice);

  await lineItemsCollection.insertOne(encodedLineitem);
  await orderCollection.updateOne(
    { "_id": orderId },
    { "$push": { "lineItems": encodedLineitem } }
  );
}

  
    return orderId;
  }
//   async saveOrder(lineItems, customer) {
//     await this.connect();

//     // if (!Array.isArray(lineItems)) {
//     //     throw new Error('Line items are missing or not provided as an array.');
//     // }

//     let db = this.client.db("shop");
//     let collection = db.collection("orders");

//     let result = await collection.insertOne({ 
//         "customer": customer, 
//         "orderDate": new Date(), 
//         "status": "unpaid", 
//         "totalPrice": 0,
//         "paymentId": null
//     }); 

//     let orderId = result.insertedId;

//     let encodedLineitems = lineItems.map((lineItem) => {
//         return {
//             "amount": lineItem["amount"],
//             "totalPrice": 0, //calculate,
//             "order": new mongodb.ObjectId(orderId),
//             "product": new mongodb.ObjectId(lineItem["product"]),
//         }
//     });

//     let lineItemsCollection = db.collection("lineItems");
//     await lineItemsCollection.insertMany(encodedLineitems);
    
//     return result.insertedId;
// }

    async getAllOrders() {
        await this.connect();
        
        let db = this.client.db('shop');
        let collection = db.collection('orders');
        let pipeline = [
          {
            $lookup: {
              from: "lineItems",
              localField: "_id",
              foreignField: "order",
              as: "lineItems",
            },
          },
          {
            $lookup: {
              from: "customers",
              localField: "customer",
              foreignField: "_id",
              as: "customer",
            },
          },
          {
            $addFields: {
              linkedCustomer: {
                $first: "$customer",
              },
            },
          },
        ]
        // let pipeline = ['
        //   {
        //     $lookup: {
        //       from: "lineItems",
        //       localField: "_id",
        //       foreignField: "order",
        //       as: "lineItems",
        //       pipeline: [
        //         {
        //           $lookup: {
        //             from: "products",
        //             localField: "products",
        //             foreignField: "id",
        //             as: "product",
        //           },
        //         },
        //         {
        //           $addFields: {
        //             product: {
        //               $first: "$product",
        //             },
        //           },
        //         },
        //       ],
        //     },
        //   },
        //   {
        //     $lookup: {
        //       from: "customers",
        //       localField: "customer",
        //       foreignField: "_id",
        //       as: "customer",
        //     },
        //   },
        //   {
        //     $addFields: {
        //       linkedCustomer: {
        //         $first: "$customer",
        //       },
        //     },
        //   },
        // ]
        // '
        let documents = collection.aggregate(pipeline)
        let returnArray = [];
       
        for await(let document of documents) {
          returnArray.push(document);
       }
        return returnArray 


      
    }

    async createCustomer(email, firstName, lastName, address1, address2, postalCode, city, country) {
      await this.connect();
      
      let db = this.client.db("shop");
      let collection = db.collection("customers");
  
      let result = await collection.insertOne({
          "_id": email,
          "firstName": firstName,
          "lastName": lastName,
          "address": {
              "address1": address1,
              "address2": address2,
              "postalCode": postalCode,
              "city": city,
              "country": country
          }
      });
  
      return result.insertedId; // Returnera den nya kundens ID
  }
  
    // async getOrCreateCustomer(email, firstName, lastName, address1, address2, postalCode, city, country) {
    //   // Implementation för att få eller skapa kund
    //   customer = await this.createCustomer(email, firstName, lastName, address1, address2, postalCode, city, country);
    //   console.log(customer)
    // } 
    
    // async createOrder (lineItems, customer) {
    //     // Implementation för att skapa en order
    //     return {"id": "order1234567"};
    // }


async createProduct() {
  await this.connect();

  let db = this.client.db("shop");
  let collection = db.collection("products");
  
  let result = await collection.insertOne({"status": "draft", "name": "null", "description": null, "image": null, "amountInStock": 0, "price": 0, "category": null}); 

  return result.insertedId;
}


async updateProduct(id, productData) {
  await this.connect();

  let db = this.client.db("shop");
  let collection = db.collection("products");

  await collection.updateOne({"_id": new mongodb.ObjectId(id)}, {"$set": {
    "name": productData["name"],
   "description": productData["description"],
    "amountInStock": productData["amountInStock"],
    "price": productData["price"],
    "category": productData["category"] ? new mongodb.ObjectId(productData["category"]) : null
 }})
}


async getProducts () {
  await this.connect();

  let db = this.client.db("shop");
  let collection = db.collection("products");

  let pipeline = [
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $addFields: {
        category: {
          $first: "$category",
        },
      },
    },
  ]


  let documents = collection.aggregate(pipeline)
  let returnArray = [];
 
  for await(let document of documents) {
    returnArray.push(document);
 }
  return returnArray
}


  static getInstance() {
    if (instance === null) {
      instance = new DatabaseConnection();
    }
    return instance; 
  }
};

module.exports = DatabaseConnection; 
