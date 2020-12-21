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

// Gerister restaurants repository container
container.registerSingleton<IRestaurantsRepository>(
    'RestaurantsRepository',
    RestaurantsRepository,
);

// Gerister menus repository container
container.registerSingleton<IMenusRepository>(
    'MenusRepository',
    MenusRepository,
);
