/**
 * Create Item DTO
 */

export interface ICreateItemDTO {
    restaurant_id: string;
    image?: string;
    title: string;
    description: string;
    price: number;
    discount_price: number;
    enabled: boolean;
    category_name: string;
}

export interface ISaveItemDTO {
    restaurant_id: string;
    image?: string;
    title: string;
    description: string;
    price: number;
    discount_price: number;
    category_id: number;
    enabled: boolean;
}
