import express from 'express';
import { Database } from './config';
import { userRoutes } from './routes';

const server = express();
const database = new Database();

//Server Configuration
database.connectDatabase();
server.use(express.json());

//Server Routes
server.use('/api/user', userRoutes);

export default server;