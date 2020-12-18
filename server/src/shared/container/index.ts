/**
 * Containers Controller
 */

import { container } from 'tsyringe';

import IRestaurantsRepository from '../../modules/restaurants/repositories/IRestaurantsRepository';
import RestaurantsRepository from '../../modules/restaurants/typeorm/repositories/RestaurantsRepository';

container.registerSingleton<IRestaurantsRepository>('RestaurantsRepository', RestaurantsRepository);
