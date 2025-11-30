import { Request, Response } from "express";
import { CotizacionModel } from "../models/CotizacionModel";
import { UsuarioModel } from "../models/UsuarioModel";

export class CotizacionController {
    
    // Crear nueva solicitud de cotización
    public static crearSolicitud = async (req: Request, res: Response) => {
        try {
            const usuario = req.usuario;
            const { idCartaScryfall, nombreCarta, notasCliente } = req.body;

            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            const cotizacion = await CotizacionModel.create({
                idUsuario: usuario.idUsuario,
                idCartaScryfall,
                nombreCarta,
                notasCliente: notasCliente || null,
                estado: 'pendiente'
            });

            res.status(201).json({
                success: true,
                message: 'Solicitud de cotización creada exitosamente',
                data: cotizacion
            });

        } catch (error) {
            console.error('Error al crear solicitud de cotización:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Obtener cotizaciones del usuario
    public static getCotizacionesUsuario = async (req: Request, res: Response) => {
        try {
            const usuario = req.usuario;

            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            const cotizaciones = await CotizacionModel.findAll({
                where: { idUsuario: usuario.idUsuario },
                order: [['createdAt', 'DESC']]
            });

            res.json({
                success: true,
                data: cotizaciones
            });

        } catch (error) {
            console.error('Error al obtener cotizaciones:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Obtener todas las cotizaciones (admin)
    public static getAllCotizaciones = async (req: Request, res: Response) => {
        try {
            const { page = 1, limit = 20, estado } = req.query;
            const offset = (Number(page) - 1) * Number(limit);

            const where: any = {};
            if (estado) where.estado = estado;

            const { count, rows: cotizaciones } = await CotizacionModel.findAndCountAll({
                where,
                include: [
                    {
                        model: UsuarioModel,
                        attributes: ['idUsuario', 'nombres', 'apellidos', 'correo', 'usuario']
                    }
                ],
                order: [['createdAt', 'DESC']],
                limit: Number(limit),
                offset
            });

            res.json({
                success: true,
                data: cotizaciones,
                pagination: {
                    currentPage: Number(page),
                    totalPages: Math.ceil(count / Number(limit)),
                    totalItems: count,
                    itemsPerPage: Number(limit)
                }
            });

        } catch (error) {
            console.error('Error al obtener cotizaciones:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Actualizar cotización (admin)
    public static actualizarCotizacion = async (req: Request, res: Response) => {
        try {
            const { idCotizacion } = req.params;
            const { precioCotizado, diasEntrega, notasAdministrador, estado } = req.body;

            const cotizacion = await CotizacionModel.findByPk(idCotizacion);
            if (!cotizacion) {
                return res.status(404).json({
                    success: false,
                    message: 'Cotización no encontrada'
                });
            }

            const updateData: any = {
                notasAdministrador: notasAdministrador || cotizacion.notasAdministrador
            };

            // Si se está cotizando
            if (precioCotizado !== undefined && diasEntrega !== undefined) {
                updateData.precioCotizado = precioCotizado;
                updateData.diasEntrega = diasEntrega;
                updateData.estado = 'cotizada';
                updateData.fechaCotizacion = new Date();
            }

            // Si solo se cambia el estado
            if (estado) {
                updateData.estado = estado;
                if (estado === 'aceptada' || estado === 'rechazada') {
                    updateData.fechaRespuesta = new Date();
                }
                if (estado === 'completada') {
                    updateData.fechaCompletada = new Date();
                }
            }

            await cotizacion.update(updateData);

            const cotizacionActualizada = await CotizacionModel.findByPk(idCotizacion, {
                include: [
                    {
                        model: UsuarioModel,
                        attributes: ['idUsuario', 'nombres', 'apellidos', 'correo', 'usuario']
                    }
                ]
            });

            res.json({
                success: true,
                message: 'Cotización actualizada exitosamente',
                data: cotizacionActualizada
            });

        } catch (error) {
            console.error('Error al actualizar cotización:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Aceptar/rechazar cotización (usuario)
    public static responderCotizacion = async (req: Request, res: Response) => {
        try {
            const usuario = req.usuario;
            const { idCotizacion } = req.params;
            const { accion } = req.body; // 'aceptar' o 'rechazar'

            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            const cotizacion = await CotizacionModel.findOne({
                where: { 
                    idCotizacion, 
                    idUsuario: usuario.idUsuario,
                    estado: 'cotizada'
                }
            });

            if (!cotizacion) {
                return res.status(404).json({
                    success: false,
                    message: 'Cotización no encontrada o no disponible para respuesta'
                });
            }

            const nuevoEstado = accion === 'aceptar' ? 'aceptada' : 'rechazada';
            await cotizacion.update({
                estado: nuevoEstado,
                fechaRespuesta: new Date()
            });

            res.json({
                success: true,
                message: `Cotización ${nuevoEstado} exitosamente`,
                data: cotizacion
            });

        } catch (error) {
            console.error('Error al responder cotización:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Obtener estadísticas de cotizaciones
    public static getEstadisticas = async (req: Request, res: Response) => {
        try {
            const totalCotizaciones = await CotizacionModel.count();
            const cotizacionesPendientes = await CotizacionModel.count({ where: { estado: 'pendiente' } });
            const cotizacionesCotizadas = await CotizacionModel.count({ where: { estado: 'cotizada' } });
            const cotizacionesAceptadas = await CotizacionModel.count({ where: { estado: 'aceptada' } });
            const cotizacionesCompletadas = await CotizacionModel.count({ where: { estado: 'completada' } });

            res.json({
                success: true,
                data: {
                    totalCotizaciones,
                    cotizacionesPendientes,
                    cotizacionesCotizadas,
                    cotizacionesAceptadas,
                    cotizacionesCompletadas
                }
            });

        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
}