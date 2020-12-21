/**
 * Update Restaurant Data DTO
 */

interface IUpdateRestaurantData {
    restaurant_id: string;
    trade: string;
    telephone: string;
    logo: string;
    new_password?: string;
    old_password: string;
}

export default IUpdateRestaurantData;
