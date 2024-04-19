export interface Product {
    _id: string,
    Name: string,
    Description: string,
    Images: string[],  
    StockAmount: number,
    Price: number,
    Status: string
}