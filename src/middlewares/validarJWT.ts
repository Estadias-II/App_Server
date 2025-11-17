import { Request, Response, NextFunction } from 'express';
import colors from 'colors';
import { verificarJWT } from '../utils/generarJWT';
import { UsuarioModel } from '../models/UsuarioModel';

// Extender la interfaz Request para incluir el usuario
declare global {
    namespace Express {
        interface Request {
            usuario?: UsuarioModel;
        }
    }
}

export const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    // Verificar si el token existe
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token de autorización requerido'
        });
    }

    // Verificar el formato del token (Bearer token)
    if (!token.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Formato de token inválido. Debe ser: Bearer [token]'
        });
    }

    try {
        // Extraer el token sin la palabra "Bearer"
        const tokenWithoutBearer = token.substring(7);

        // Verificar y decodificar el token
        const decoded = await verificarJWT(tokenWithoutBearer);

        // Buscar el usuario en la base de datos
        const usuario = await UsuarioModel.findByPk(decoded.uid, {
            attributes: { exclude: ['contraseña'] }
        });

        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: 'Token válido pero usuario no encontrado'
            });
        }

        // Agregar el usuario al request para uso en controllers
        req.usuario = usuario;

        next();
    } catch (error) {
        console.error(colors.red.italic.bold(`Error al validar JWT: ${error}`));
        
        let message = 'Token inválido';
        if (error instanceof Error) {
            if (error.message.includes('expired')) {
                message = 'Token expirado';
            } else if (error.message.includes('invalid')) {
                message = 'Token inválido';
            }
        }

        return res.status(401).json({
            success: false,
            message
        });
    }
};