/**
 * Containers Controller
 */

import { container } from 'tsyringe';

import '../../modules/restaurants/providers';

import IRestaurantsRepository from '../../modules/restaurants/repositories/IRestaurantsRepository';
import RestaurantsRepository from '../../modules/restaurants/typeorm/repositories/RestaurantsRepository';

// Gerister restaurants repository container
container.registerSingleton<IRestaurantsRepository>('RestaurantsRepository', RestaurantsRepository);
