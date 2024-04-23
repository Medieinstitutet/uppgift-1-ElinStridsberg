export interface Product {
    _id: string,
    name: string,
    description: string,
    image: string[],  
    mountInStock: number,
    price: number,
    status: string
}