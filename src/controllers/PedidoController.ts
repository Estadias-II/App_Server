// backend/controllers/PedidoController.ts
import { Request, Response } from "express";
import { PedidoModel } from "../models/PedidoModel";
import { PedidoItemModel } from "../models/PedidoItemModel";
import { CartaGestionModel } from "../models/CartaGestionModel";

export class PedidoController {
    
    // Crear pedido desde el carrito
    public static crearPedido = async (req: Request, res: Response) => {
        try {
            const usuario = req.usuario;
            const { items, total, totalItems, notas } = req.body;

            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            // Generar número de pedido único
            const numeroPedido = `PED-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            // Crear pedido
            const pedido = await PedidoModel.create({
                idUsuario: usuario.idUsuario,
                numeroPedido,
                total,
                totalItems,
                estado: 'pendiente',
                notas: notas || null
            });

            // Crear items del pedido
            const itemsPedido = await Promise.all(
                items.map(async (item: any) => {
                    // Verificar stock disponible
                    const cartaGestion = await CartaGestionModel.findOne({
                        where: { idCartaScryfall: item.card.id }
                    });

                    if (cartaGestion && cartaGestion.stockLocal < item.quantity) {
                        throw new Error(`Stock insuficiente para: ${item.card.name}`);
                    }

                    // Reducir stock
                    if (cartaGestion) {
                        await cartaGestion.update({
                            stockLocal: cartaGestion.stockLocal - item.quantity
                        });
                    }

                    return PedidoItemModel.create({
                        idPedido: pedido.idPedido,
                        idCartaScryfall: item.card.id,
                        nombreCarta: item.card.name,
                        precioUnitario: parseFloat(
                            item.card.prices?.usd ||
                            item.card.prices?.usd_foil ||
                            item.card.prices?.eur || '0'
                        ),
                        cantidad: item.quantity,
                        subtotal: parseFloat(
                            item.card.prices?.usd ||
                            item.card.prices?.usd_foil ||
                            item.card.prices?.eur || '0'
                        ) * item.quantity
                    });
                })
            );

            const pedidoCompleto = await PedidoModel.findByPk(pedido.idPedido, {
                include: [
                    { model: PedidoItemModel, as: 'items' }
                ]
            });

            res.status(201).json({
                success: true,
                message: 'Pedido creado exitosamente',
                data: pedidoCompleto
            });

        } catch (error: any) {
            console.error('Error al crear pedido:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Error interno del servidor'
            });
        }
    }

    // Obtener pedidos del usuario
    public static getPedidosUsuario = async (req: Request, res: Response) => {
        try {
            const usuario = req.usuario;

            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            const pedidos = await PedidoModel.findAll({
                where: { idUsuario: usuario.idUsuario },
                include: [
                    { model: PedidoItemModel, as: 'items' }
                ],
                order: [['createdAt', 'DESC']]
            });

            res.json({
                success: true,
                data: pedidos
            });

        } catch (error) {
            console.error('Error al obtener pedidos:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Obtener todos los pedidos (admin)
    public static getAllPedidos = async (req: Request, res: Response) => {
        try {
            const { page = 1, limit = 20, estado } = req.query;
            const offset = (Number(page) - 1) * Number(limit);

            const where: any = {};
            if (estado) where.estado = estado;

            const { count, rows: pedidos } = await PedidoModel.findAndCountAll({
                where,
                include: [
                    { model: PedidoItemModel, as: 'items' }
                ],
                order: [['createdAt', 'DESC']],
                limit: Number(limit),
                offset
            });

            res.json({
                success: true,
                data: pedidos,
                pagination: {
                    currentPage: Number(page),
                    totalPages: Math.ceil(count / Number(limit)),
                    totalItems: count,
                    itemsPerPage: Number(limit)
                }
            });

        } catch (error) {
            console.error('Error al obtener pedidos:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Actualizar estado del pedido
    public static updateEstadoPedido = async (req: Request, res: Response) => {
        try {
            const { idPedido } = req.params;
            const { estado, notas } = req.body;

            const pedido = await PedidoModel.findByPk(idPedido);
            if (!pedido) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }

            await pedido.update({
                estado,
                notas: notas || pedido.notas
            });

            res.json({
                success: true,
                message: 'Estado del pedido actualizado',
                data: pedido
            });

        } catch (error) {
            console.error('Error al actualizar pedido:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Obtener estadísticas de pedidos
    public static getEstadisticas = async (req: Request, res: Response) => {
        try {
            const totalPedidos = await PedidoModel.count();
            const pedidosPendientes = await PedidoModel.count({ where: { estado: 'pendiente' } });
            const pedidosCompletados = await PedidoModel.count({ where: { estado: 'completado' } });
            const ingresosTotales = await PedidoModel.sum('total', { where: { estado: 'completado' } });

            res.json({
                success: true,
                data: {
                    totalPedidos,
                    pedidosPendientes,
                    pedidosCompletados,
                    ingresosTotales: ingresosTotales || 0
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