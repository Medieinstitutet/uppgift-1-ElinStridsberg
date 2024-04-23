export interface Order {
    _id: string,
    customer: {
        _id: string,
        firstName: string,
        lastName: string,
        adress: {
            adress1: string;
            adress2: string;
            zipCode: string;
            city: string;
            country: string;
        };
        password: string;
    };
    linkedItems: {
        amount: string,
        order: string,
        product: {
            amountInStock: number,
            category: string,
            description: string,
            image: null,
            price: number,
            status: string,
            _id: string
        },
        totalPrice: number,
        _id: string,
    }[]
}
