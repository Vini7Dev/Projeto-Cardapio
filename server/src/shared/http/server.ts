import express from 'express';
import routes from './routes';

// Create a server main controller
const server = express();

// Using JSON
server.use(express.json());

// Use the app routes
server.use(routes);

// Start the server on port 3333
server.listen(3333, () => {
    console.log('===> Server started on port "3333" <===');
});
