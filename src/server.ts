import express from 'express';
import { Database } from './config';
import {router as usuarioRouter} from './routes/usuarioRoutes';

const server = express();
const database = new Database();

//Server Configuration
database.connectDatabase();
server.use(express.json());

//Routes

server.use('/api/usuarios', usuarioRouter);

export default server;