import express from 'express';
import { Database } from './config';

const server = express();
const database = new Database();

database.connectDatabase();
server.use(express.json());

export default server;