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
    let collection = db.collection("orders");

    let result = await collection.insertOne({ 
      "customer": customer, 
      "orderDate":new Date(), 
      "status": "unpaid", 
      "totalPrice": 0,
      "paymentId": null
    }); 
    let orderId = result.insertedId;
    let encodedLineitems = lineItems.map((lineItem) => {
      return {
        "amount": lineItem["amount"],
        "totalPrice": 0, //calculate,
        "order": new mongodb.ObjectId(orderId),
        "product": new mongodb.ObjectId(lineItem["product"]),
      }
    })
    let lineItemsCollection = collection = db.collection("lineItems");
    await lineItemsCollection.insertMany(encodedLineitems)
    //todo lineItems
   return result.insertedId;
  }

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
              pipeline: [
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $addFields: {
              product: {
                $first: "$product",
              },
            },
          },
        ]
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
        
        let documents = collection.aggregate(pipeline)
        let returnArray = [];
       
        for await(let document of documents) {
          returnArray.push(document);
       }
        return returnArray


      
    }
  
    async getOrCreateCustomer(email, name, address) {
        // Implementation för att få eller skapa kund
        return {"id": 1234567};
    } 
    
    async createOrder (lineItems, customer) {
        // Implementation för att skapa en order
        return {"id": "order1234567"};
    }


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
