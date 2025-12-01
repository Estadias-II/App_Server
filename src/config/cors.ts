import { CorsOptions } from "cors"
import dotenv from 'dotenv';


dotenv.config();

const whitelist = [process.env.FRONTEND_URL];

export const corsOptions: CorsOptions = {
    origin: function (origin: string | undefined, callback) {
        if (whitelist.indexOf(origin ?? '') !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
