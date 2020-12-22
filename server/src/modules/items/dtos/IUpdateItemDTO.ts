/**
 * Update Item DTO
 */

export interface IUpdateItemDTO {
    restaurant_id: string;
    item_id: string;
    image: string;
    title: string;
    description: string;
    price: number;
    discount_price: number;
    category_name: string;
    enabled: boolean;
}

export interface ISaveUpdatetedItemDTO {
    image: string;
    title: string;
    description: string;
    price: number;
    discount_price: number;
    category_id: string;
    restaurant_id: string;
}
