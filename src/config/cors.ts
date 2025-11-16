import { CorsOptions } from "cors"

const whitelist = ["http://localhost:5173"];

export const corsOptions: CorsOptions = {
    origin: function (origin: string | undefined, callback) {
        if (whitelist.indexOf(origin ?? '') !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
