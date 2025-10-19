


export interface GiftResponse {
    status: string;
    message: string;
    data: Gift[];
    timestamp: string;
}

export interface Gift {
    productId: string;
    imageUrl: string;
    name: string;
    price: number;
    fileUrl: string;
}
