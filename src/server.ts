import express from 'express';
import { Database } from './config';
import {router as usuarioRouter} from './routes/usuarioRoutes';
import { corsOptions } from './config/cors';
import cors from 'cors';

const server = express();
const database = new Database();

//Server Configuration
database.connectDatabase();
server.use(express.json());
server.use(cors(corsOptions));

//Routes

server.use('/api/usuarios', usuarioRouter);

export default server;