/**
 * Create Menu Service
 */

import { inject, injectable } from "tsyringe";
import IMenusRepository from "../repositories/IMenusRepository";

 @injectable()
class CreateMenuService {
    constructor(
        @inject('MenusRepository')
        private menusRepository: IMenusRepository
    ) {}

    // Executing the service
    public async execute() {
        // Creating menu
        const menuCreated = await this.menusRepository.create();

        // Return menu data
        return menuCreated;
    }
}

export default CreateMenuService;
