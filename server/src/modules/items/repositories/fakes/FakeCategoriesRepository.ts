/**
 * Fake: Categories Repository
 */

import Category from '../../typeorm/entities/Category';

import ICategoriesRepository from '../ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
    private storage: Category[] = [];

    // Find category by name
    public async findByName(
        category_name: string,
    ): Promise<Category | undefined> {
        const findedCategory = await this.storage.find(
            category => category.category_name === category_name,
        );

        return findedCategory;
    }

    // Create item
    public async create(category_name: string): Promise<Category> {
        const category = new Category();

        const categoryToSave = {
            ...category,
            category_name,
        };

        await this.storage.push(categoryToSave);

        return categoryToSave;
    }
}

export default FakeCategoriesRepository;
