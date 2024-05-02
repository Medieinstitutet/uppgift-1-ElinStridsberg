export interface Address {
    adress1: string;
    adress2: string;
    zipCode: string;
    city: string;
    country: string;
}

export interface Product {
    _id: string;
    amountInStock: number;
    category: string | null;
    description: string | null;
    image: string | null;
    name: string;
    price: number;
    status: string;
}

export interface Customer {
    _id: string;
    firstName: string;
    lastName: string;
    adress: Address;
    password: string;
}

export interface LineItem {
    _id: string;
    product: Product; 
    amount: string;
    order: string;
    totalPrice: number;
    
}

export interface Order {
    _id: string;
    customer: Customer[];
    totalPrice: number;
    orderDate: string;
    status: string;
    paymentId: string | null;
    lineItems: LineItem[]; 
    linkedCustomer: Customer;
}
