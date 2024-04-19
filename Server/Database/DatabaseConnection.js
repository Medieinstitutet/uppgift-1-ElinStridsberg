let mongodb = require("mongodb");
let instance = null;

class DatabaseConnection {
    constructor(){
        console.log("DatabaseConnection: constructor")
        
        this.client = null;
        this.url = null;

        this.debugId = Math.floor(Math.random()*10000000000)
    }

setUrl(url){
    this.url = url
}

async connect() {
        if(!this.client) {
            this.client = new mongodb.MongoClient(this.url);  
            
            await this.client.connect()
        }
    }          
       async getAllOrders() {
        await this.connect();

            let db = this.client.db('shop');
            let collection = db.collection('orders');
            
   
            let pipeline = [
                        {
                          $lookup:
                            
                            {
                              from: "lineItems",
                              localField: "order",
                              foreignField: "id",
                              as: "lineItems",
                              pipeline: [
                                {
                                  $lookup: {
                                    from: "products",
                                    localField: "id",
                                    foreignField: "product",
                                    as: "linkedProduct",
                                  },
                                },
                                {
                                  $addFields: {
                                    linkedProduct: {
                                      $first: "$linkedProduct",
                                    },
                                  },
                                },
                              ],
                            },
                        },
                        {
                          $lookup:
            
                            {
                              from: "customers",
                              localField: "id",
                              foreignField: "customer",
                              as: "linkedCustomer",
                            },
                        },
                        {
                          $addFields:
                          
                            {
                              linkedCustomer: {
                                $first: "$linkedCustomer",
                              },
                              calculatedTotal: {
                                $sum: "$lineItems.totalPrice",
                              },
                            },
                        },
                      ]
            
                    const aggregate = collection.aggregate(pipeline)
                    
                    let orders = []
            
                    for await (const document of aggregate) {
                        orders.push(document)
                    }

                    return orders
            
}

   async getOrCreateCustomer(email, name, adress) { //TODO
    
        return {"id": 1234567}
   } 
   
   async createOrder (lineItems, customer) { //TODO

    return {"id": "order1234567"}

   }


    static getInstace() {
        if (instance === null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}

module.exports = DatabaseConnection;