export interface Product {
    _id: string,
    name: string,
    description: string,
    image: string[],  
    amountInStock: number,
    price: number,
    status: string
}