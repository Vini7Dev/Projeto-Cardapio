/**
 * Categories Repository
 */

import { getRepository, Repository } from 'typeorm';

import Category from '../entities/Category';

import ICategoriesRepository from '../../repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    // Find category by name
    public async findByName(
        category_name: string,
    ): Promise<Category | undefined> {
        const findedCategory = await this.repository.findOne({
            where: { category_name },
        });

        return findedCategory;
    }

    // Creating a new category
    public async create(category_name: string): Promise<Category> {
        const createdCategory = await this.repository.create({ category_name });

        const savedCategory = await this.repository.save(createdCategory);

        return savedCategory;
    }
}

export default CategoriesRepository;
