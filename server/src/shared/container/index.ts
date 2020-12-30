/**
 * Containers Controller
 */

import { container } from 'tsyringe';

import '../../modules/restaurants/providers';
import './providers';

import IRestaurantsRepository from '../../modules/restaurants/repositories/IRestaurantsRepository';
import RestaurantsRepository from '../../modules/restaurants/typeorm/repositories/RestaurantsRepository';

import IMenusRepository from '../../modules/menu/repositories/IMenusRepository';
import MenusRepository from '../../modules/menu/typeorm/repositories/MenusRepository';

import IItemsrepository from '../../modules/items/repositories/IItemsRepository';
import ItemsRepository from '../../modules/items/typeorm/repositories/ItemsRepository';

import ICategoriesRepository from '../../modules/items/repositories/ICategoriesRepository';
import CategoriesRepository from '../../modules/items/typeorm/repositories/CategoriesRepository';

import IMenuItemsRepository from '../../modules/menu/repositories/IMenuItemsRepository';
import MenuItemsRepository from '../../modules/menu/typeorm/repositories/MenuItemsRepository';

import IForgotPasswordTokensRepository from '../../modules/restaurants/repositories/IForgotPasswordTokensRepository';
import ForgotPasswordTokensRepository from '../../modules/restaurants/typeorm/repositories/ForgotPasswordTokensRepository';

// Register restaurants repository container
container.registerSingleton<IRestaurantsRepository>(
    'RestaurantsRepository',
    RestaurantsRepository,
);

// Register menus repository container
container.registerSingleton<IMenusRepository>(
    'MenusRepository',
    MenusRepository,
);

// Register items repository container
container.registerSingleton<IItemsrepository>(
    'ItemsRepository',
    ItemsRepository,
);

// Register categories repository container
container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository,
);

// Register menu items repository container
container.registerSingleton<IMenuItemsRepository>(
    'MenuItemsRepository',
    MenuItemsRepository,
);

// Register forgot password tokens repository container
container.registerSingleton<IForgotPasswordTokensRepository>(
    'ForgotPasswordTokensRepository',
    ForgotPasswordTokensRepository,
);
