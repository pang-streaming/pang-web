import { Product } from "@/entities/product/type";

export interface Store {
    name: string;
    description: string;
    profileImage: string;
    bannerImage: string;
    products: Product[]
}