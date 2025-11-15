import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UsuarioModel } from "../models/UsuarioModel";

export class UsuarioController {
    
    // Obtener todos los usuarios (sin contraseñas)
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

    // Obtener usuario por ID
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

    // Crear nuevo usuario
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

            // Verificar si el correo ya existe
            const existeCorreo = await UsuarioModel.findOne({ where: { correo } });
            if (existeCorreo) {
                return res.status(400).json({
                    success: false,
                    message: 'El correo electrónico ya está registrado'
                });
            }

            // Verificar si el nombre de usuario ya existe
            const existeUsuario = await UsuarioModel.findOne({ where: { usuario } });
            if (existeUsuario) {
                return res.status(400).json({
                    success: false,
                    message: 'El nombre de usuario ya está en uso'
                });
            }

            // Encriptar contraseña
            const saltRounds = 10;
            const contraseñaEncriptada = await bcrypt.hash(contraseña, saltRounds);

            // Crear usuario
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

            // Excluir contraseña en la respuesta
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

    // Actualizar usuario
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

            // Actualizar campos permitidos
            await usuario.update({
                nombres: nombres || usuario.nombres,
                apellidos: apellidos || usuario.apellidos,
                fechaNacimiento: fechaNacimiento || usuario.fechaNacimiento,
                pais: pais || usuario.pais,
                ciudad: ciudad || usuario.ciudad,
                codigoPostal: codigoPostal || usuario.codigoPostal
            });

            // Excluir contraseña en la respuesta
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

    // Eliminar usuario
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

    // Login de usuario
    public static login = async (req: Request, res: Response) => {
        try {
            const { correo, contraseña } = req.body;

            // Buscar usuario por correo
            const usuario = await UsuarioModel.findOne({ where: { correo } });
            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            // Verificar contraseña
            const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
            if (!contraseñaValida) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            // Excluir contraseña en la respuesta
            const usuarioResponse = { ...usuario.toJSON() };
            delete (usuarioResponse as any).contraseña;

            res.json({
                success: true,
                message: 'Login exitoso',
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
}