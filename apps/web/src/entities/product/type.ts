
export interface Product {
    id: string;
    image: string;
    name: string;
    price: number;
    seller: string;
}

export interface ProductResponse {
    status: string;
    message: string;
    data: Product;
    timestamp: string;
}