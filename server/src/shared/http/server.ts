import 'reflect-metadata';
import '../typeorm/database';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from '../errors/AppError';
import routes from './routes';
import uploadConfig from '../../config/uploadConfig';

import '../container';

// Create a server main controller
const server = express();

// Using JSON
server.use(express.json());

// Show uploaded files
server.use('/files', express.static(uploadConfig.uploadsFolder));

// Use the app routes
server.use(routes);

// Use App Error Controller
server.use(
    (
        error: Error,
        request: Request,
        response: Response,
        nextFunction: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response
                .status(error.code)
                .json({ status: 'error', error: error.message });
        }

        console.error(error);

        return response
            .status(500)
            .json({ status: 'error', error: 'Internal server error.' });
    },
);

// Start the server on port 3333
server.listen(3333, () => {
    console.log('===> Server started on port "3333" <===');
    console.log('=] Lembretes[ [=');
    console.log('=> Trocar o secret do token;');
    console.log('=> Remover o Password do retorno dos dados.');
});
