import jwt from 'jsonwebtoken';
import colors from 'colors';

// Interfaz para el payload del JWT
interface JwtPayload {
    uid: number;
    iat?: number;
    exp?: number;
}

export const generarJWT = (uid: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Verificar que la clave secreta esté definida
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            console.error(colors.red.italic.bold('JWT_SECRET no está definida en las variables de entorno'));
            reject(new Error('Error en la configuración del servidor'));
            return;
        }

        const payload: JwtPayload = { uid };

        const options: jwt.SignOptions = {
            expiresIn: '24h'
        };

        jwt.sign(payload, secretKey, options, (err, token) => {
            if (err) {
                console.error(colors.red.italic.bold(`Error al generar JWT: ${err}`));
                reject(new Error('No se pudo generar el token'));
            } else if (token) {
                resolve(token);
            } else {
                reject(new Error('Token no generado'));
            }
        });
    });
};

// Función para verificar y decodificar el JWT
export const verificarJWT = (token: string): Promise<JwtPayload> => {
    return new Promise((resolve, reject) => {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            reject(new Error('JWT_SECRET no está definida'));
            return;
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(new Error('Token inválido'));
            } else {
                resolve(decoded as JwtPayload);
            }
        });
    });
};