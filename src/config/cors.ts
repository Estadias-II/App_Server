import { CorsOptions } from "cors"
import dotenv from 'dotenv';

dotenv.config();

const whitelist = [
    process.env.FRONTEND_URL, 
    'http://localhost:18512', 
    'http://127.0.0.1:18512', 
];

export const corsOptions: CorsOptions = {
    origin: function (origin: string | undefined, callback) {
        // Si no hay origen (peticiones desde Postman, curl, etc.)
        if (!origin) {
            return callback(null, true);
        }
        
        // Verificar si el origen está en la whitelist
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log(`CORS bloqueado para origen: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    }
}