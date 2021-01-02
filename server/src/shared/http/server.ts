import 'reflect-metadata';
import 'dotenv/config';
import '../typeorm/database';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';

import AppError from '../errors/AppError';
import routes from './routes';
import uploadConfig from '../../config/uploadConfig';

import '../container';

// Create a server main controller
const server = express();

// Using CORS
const corsOpts = cors({
    origin: process.env.APP_WEB_URL,
});
server.use(corsOpts);

// Using JSON
server.use(express.json());

// Show uploaded files
server.use('/files', express.static(uploadConfig.uploadsFolder));

// Use the app routes
server.use(routes);

// Use 'errors' for celebrate's failed validation
server.use(errors());

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
                .status(error.status)
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
});
