/**
 * Categories Repository Interface
 */

import Category from '../typeorm/entities/Category';

interface ICategoriesRepository {
    findByName(category_name: string): Promise<Category | undefined>; // Find category by name
    create(category_name: string): Promise<Category>; // Create new category
}

export default ICategoriesRepository;
