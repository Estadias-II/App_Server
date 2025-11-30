// backend/server.ts (actualizado)
import express from 'express';
import { Database } from './config';
import { router as usuarioRouter } from './routes/usuarioRoutes';
import { router as cartaGestionRouter } from './routes/cartaGestionRoutes';
import { router as pedidosRouter } from './routes/pedidoRoutes';
import { router as cotizacionRouter } from './routes/cotizacionRoutes';
import { corsOptions } from './config/cors';
import cors from 'cors';

const server = express();
const database = new Database();

// Server Configuration
database.connectDatabase();
server.use(express.json());
server.use(cors(corsOptions));

// Routes
server.use('/api/usuarios', usuarioRouter);
server.use('/api/cartas-gestion', cartaGestionRouter);
server.use('/api/pedidos', pedidosRouter);
server.use('/api/cotizaciones', cotizacionRouter);

export default server;