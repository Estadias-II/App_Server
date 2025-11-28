// middlewares/verifyAdmin.ts
import { Request, Response, NextFunction } from 'express';
import { UsuarioModel } from '../models/UsuarioModel';

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = req.usuario;

        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no autenticado'
            });
        }

        // Buscar usuario actualizado con el rol
        const usuarioCompleto = await UsuarioModel.findByPk(usuario.idUsuario);
        
        if (!usuarioCompleto) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Verificar si es admin o superadmin
        if (usuarioCompleto.rol !== 'admin' && usuarioCompleto.rol !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Se requieren privilegios de administrador'
            });
        }

        // Pasar información del rol a través de res.locals
        res.locals.userRole = usuarioCompleto.rol;
        
        next();
    } catch (error) {
        console.error('Error al verificar admin:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};