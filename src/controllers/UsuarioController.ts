import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UsuarioModel } from "../models/UsuarioModel";
import { generarJWT } from "../utils/generarJWT";

export class UsuarioController {

    // Obtener perfil básico del usuario autenticado
    public static getPerfil = async (req: Request, res: Response) => {
        try {
            const usuario = req.usuario;

            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            // Buscar usuario actualizado con el rol
            const usuarioCompleto = await UsuarioModel.findByPk(usuario.idUsuario, {
                attributes: { exclude: ['contraseña'] }
            });

            if (!usuarioCompleto) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            const perfil = {
                idUsuario: usuarioCompleto.idUsuario,
                nombres: usuarioCompleto.nombres,
                apellidos: usuarioCompleto.apellidos,
                rol: usuarioCompleto.rol // Asegúrate de incluir el rol
            };

            res.json({
                success: true,
                data: perfil
            });

        } catch (error) {
            console.error('Error al obtener perfil:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Obtener perfil completo del usuario autenticado
    public static getPerfilCompleto = async (req: Request, res: Response) => {
        try {
            const usuario = req.usuario;

            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            // Buscar usuario actualizado con todos los datos
            const usuarioCompleto = await UsuarioModel.findByPk(usuario.idUsuario, {
                attributes: { exclude: ['contraseña'] }
            });

            if (!usuarioCompleto) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.json({
                success: true,
                data: usuarioCompleto
            });

        } catch (error) {
            console.error('Error al obtener perfil completo:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Actualizar perfil del usuario autenticado
    public static updatePerfil = async (req: Request, res: Response) => {
        try {
            const usuario = req.usuario;
            const {
                nombres,
                apellidos,
                fechaNacimiento,
                pais,
                ciudad,
                codigoPostal
            } = req.body;

            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            const usuarioActual = await UsuarioModel.findByPk(usuario.idUsuario);
            if (!usuarioActual) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            // Actualizar campos permitidos
            await usuarioActual.update({
                nombres: nombres || usuarioActual.nombres,
                apellidos: apellidos || usuarioActual.apellidos,
                fechaNacimiento: fechaNacimiento || usuarioActual.fechaNacimiento,
                pais: pais || usuarioActual.pais,
                ciudad: ciudad || usuarioActual.ciudad,
                codigoPostal: codigoPostal || usuarioActual.codigoPostal
            });

            // Excluir contraseña en la respuesta
            const usuarioResponse = { ...usuarioActual.toJSON() };
            delete (usuarioResponse as any).contraseña;

            res.json({
                success: true,
                message: 'Perfil actualizado exitosamente',
                data: usuarioResponse
            });

        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Cambiar contraseña del usuario autenticado
    public static updatePassword = async (req: Request, res: Response) => {
        try {
            const usuario = req.usuario;
            const { contraseñaActual, nuevaContraseña } = req.body;

            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            const usuarioActual = await UsuarioModel.findByPk(usuario.idUsuario);
            if (!usuarioActual) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            // Verificar contraseña actual
            const contraseñaValida = await bcrypt.compare(contraseñaActual, usuarioActual.contraseña);
            if (!contraseñaValida) {
                return res.status(400).json({
                    success: false,
                    message: 'La contraseña actual es incorrecta'
                });
            }

            // Encriptar nueva contraseña
            const saltRounds = 10;
            const nuevaContraseñaEncriptada = await bcrypt.hash(nuevaContraseña, saltRounds);

            // Actualizar contraseña
            await usuarioActual.update({
                contraseña: nuevaContraseñaEncriptada
            });

            res.json({
                success: true,
                message: 'Contraseña actualizada exitosamente'
            });

        } catch (error) {
            console.error('Error al cambiar contraseña:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Los demás métodos permanecen igual...
    public static getAllUsuarios = async (req: Request, res: Response) => {
        try {
            const usuarios = await UsuarioModel.findAll({
                attributes: { exclude: ['contraseña'] }
            });

            res.json({
                success: true,
                data: usuarios
            });
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    public static getUsuarioById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const usuario = await UsuarioModel.findByPk(id, {
                attributes: { exclude: ['contraseña'] }
            });

            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.json({
                success: true,
                data: usuario
            });
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    public static createUsuario = async (req: Request, res: Response) => {
        try {
            const {
                nombres,
                apellidos,
                fechaNacimiento,
                correo,
                pais,
                ciudad,
                codigoPostal,
                usuario,
                contraseña
            } = req.body;

            const existeCorreo = await UsuarioModel.findOne({ where: { correo } });
            if (existeCorreo) {
                return res.status(400).json({
                    success: false,
                    message: 'El correo electrónico ya está registrado'
                });
            }

            const existeUsuario = await UsuarioModel.findOne({ where: { usuario } });
            if (existeUsuario) {
                return res.status(400).json({
                    success: false,
                    message: 'El nombre de usuario ya está en uso'
                });
            }

            const saltRounds = 10;
            const contraseñaEncriptada = await bcrypt.hash(contraseña, saltRounds);

            const nuevoUsuario = await UsuarioModel.create({
                nombres,
                apellidos,
                fechaNacimiento,
                correo,
                pais,
                ciudad,
                codigoPostal,
                usuario,
                contraseña: contraseñaEncriptada
            });

            const usuarioResponse = { ...nuevoUsuario.toJSON() };
            delete (usuarioResponse as any).contraseña;

            res.status(201).json({
                success: true,
                message: 'Usuario creado exitosamente',
                data: usuarioResponse
            });

        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    public static updateUsuario = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const {
                nombres,
                apellidos,
                fechaNacimiento,
                pais,
                ciudad,
                codigoPostal
            } = req.body;

            const usuario = await UsuarioModel.findByPk(id);
            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            await usuario.update({
                nombres: nombres || usuario.nombres,
                apellidos: apellidos || usuario.apellidos,
                fechaNacimiento: fechaNacimiento || usuario.fechaNacimiento,
                pais: pais || usuario.pais,
                ciudad: ciudad || usuario.ciudad,
                codigoPostal: codigoPostal || usuario.codigoPostal
            });

            const usuarioResponse = { ...usuario.toJSON() };
            delete (usuarioResponse as any).contraseña;

            res.json({
                success: true,
                message: 'Usuario actualizado exitosamente',
                data: usuarioResponse
            });

        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    public static deleteUsuario = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const usuario = await UsuarioModel.findByPk(id);
            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            await usuario.destroy();

            res.json({
                success: true,
                message: 'Usuario eliminado exitosamente'
            });

        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    public static login = async (req: Request, res: Response) => {
        try {
            const { correo, contraseña } = req.body;

            const usuario = await UsuarioModel.findOne({
                where: { correo }
            });

            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
            if (!contraseñaValida) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            const token = await generarJWT(usuario.idUsuario);

            const usuarioResponse = {
                ...usuario.toJSON(),
                rol: usuario.rol // Incluir el rol en la respuesta
            };
            delete usuarioResponse.contraseña;

            res.json({
                success: true,
                message: 'Login exitoso',
                token,
                data: usuarioResponse
            });

        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    public static getAllUsuariosAdmin = async (req: Request, res: Response) => {
        try {
            const usuario = req.usuario;

            // Verificar que sea superadmin
            if (!usuario || usuario.rol !== 'superadmin') {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para realizar esta acción'
                });
            }

            const usuarios = await UsuarioModel.findAll({
                attributes: { exclude: ['contraseña'] },
                order: [['id_usuario', 'ASC']]
            });

            res.json({
                success: true,
                data: usuarios
            });
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Crear nuevo admin (solo superadmin)
    public static createAdmin = async (req: Request, res: Response) => {
        try {
            const usuario = req.usuario;

            // Verificar que sea superadmin
            if (!usuario || usuario.rol !== 'superadmin') {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para realizar esta acción'
                });
            }

            const {
                nombres,
                apellidos,
                fechaNacimiento,
                correo,
                pais,
                ciudad,
                codigoPostal,
                usuario: username,
                contraseña
            } = req.body;

            // Validaciones de existencia
            const existeCorreo = await UsuarioModel.findOne({ where: { correo } });
            if (existeCorreo) {
                return res.status(400).json({
                    success: false,
                    message: 'El correo electrónico ya está registrado'
                });
            }

            const existeUsuario = await UsuarioModel.findOne({ where: { usuario: username } });
            if (existeUsuario) {
                return res.status(400).json({
                    success: false,
                    message: 'El nombre de usuario ya está en uso'
                });
            }

            const saltRounds = 10;
            const contraseñaEncriptada = await bcrypt.hash(contraseña, saltRounds);

            const nuevoAdmin = await UsuarioModel.create({
                nombres,
                apellidos,
                fechaNacimiento,
                correo,
                pais,
                ciudad,
                codigoPostal,
                usuario: username,
                contraseña: contraseñaEncriptada,
                rol: 'admin' // Rol por defecto para nuevos admins
            });

            const adminResponse = { ...nuevoAdmin.toJSON() };
            delete (adminResponse as any).contraseña;

            res.status(201).json({
                success: true,
                message: 'Administrador creado exitosamente',
                data: adminResponse
            });

        } catch (error) {
            console.error('Error al crear administrador:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Cambiar rol de usuario (solo superadmin)
    public static updateUserRole = async (req: Request, res: Response) => {
        try {
            const usuario = req.usuario;
            const { id } = req.params;
            const { rol } = req.body;

            // Verificar que sea superadmin
            if (!usuario || usuario.rol !== 'superadmin') {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para realizar esta acción'
                });
            }

            // Validar rol
            if (!['user', 'admin', 'superadmin'].includes(rol)) {
                return res.status(400).json({
                    success: false,
                    message: 'Rol inválido'
                });
            }

            const usuarioActualizar = await UsuarioModel.findByPk(id);
            if (!usuarioActualizar) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            // NO PERMITIR cambiar el rol de otros superadmins
            if (usuarioActualizar.rol === 'superadmin' && usuarioActualizar.idUsuario !== usuario.idUsuario) {
                return res.status(400).json({
                    success: false,
                    message: 'No puedes cambiar el rol de otro Super Administrador'
                });
            }

            // No permitir cambiar el rol del propio superadmin
            if (usuarioActualizar.idUsuario === usuario.idUsuario && rol !== 'superadmin') {
                return res.status(400).json({
                    success: false,
                    message: 'No puedes cambiar tu propio rol de Super Administrador'
                });
            }

            await usuarioActualizar.update({ rol });

            const usuarioResponse = { ...usuarioActualizar.toJSON() };
            delete (usuarioResponse as any).contraseña;

            res.json({
                success: true,
                message: 'Rol de usuario actualizado exitosamente',
                data: usuarioResponse
            });

        } catch (error) {
            console.error('Error al actualizar rol:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
}