// backend/controllers/CartaGestionController.ts
import { Request, Response } from "express";
import { CartaGestionModel } from "../models/CartaGestionModel";

export class CartaGestionController {
    
    // Obtener todas las cartas con gestión
    public static getAllCartasGestion = async (req: Request, res: Response) => {
        try {
            const cartas = await CartaGestionModel.findAll({
                order: [['nombre_carta', 'ASC']]
            });

            res.json({
                success: true,
                data: cartas
            });
        } catch (error) {
            console.error('Error al obtener cartas de gestión:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Obtener gestión de una carta específica
    public static getCartaGestion = async (req: Request, res: Response) => {
        try {
            const { idScryfall } = req.params;
            
            const carta = await CartaGestionModel.findOne({
                where: { idCartaScryfall: idScryfall }
            });

            if (!carta) {
                return res.status(404).json({
                    success: false,
                    message: 'Carta no encontrada en gestión'
                });
            }

            res.json({
                success: true,
                data: carta
            });
        } catch (error) {
            console.error('Error al obtener carta de gestión:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Crear o actualizar gestión de carta
    public static upsertCartaGestion = async (req: Request, res: Response) => {
        try {
            const { 
                idCartaScryfall, 
                nombreCarta, 
                activaVenta, 
                stockLocal, 
                precioPersonalizado,
                categoriaPersonalizada 
            } = req.body;

            // Determinar estado del stock
            let estadoStock = 'normal';
            if (stockLocal < 5) estadoStock = 'bajo';
            else if (stockLocal < 15) estadoStock = 'medio';

            const [carta, created] = await CartaGestionModel.upsert({
                idCartaScryfall,
                nombreCarta,
                activaVenta: activaVenta !== undefined ? activaVenta : true,
                stockLocal: stockLocal || 0,
                precioPersonalizado: precioPersonalizado || null,
                categoriaPersonalizada: categoriaPersonalizada || null,
                estadoStock
            });

            res.json({
                success: true,
                message: created ? 'Carta agregada a gestión' : 'Carta actualizada en gestión',
                data: carta
            });
        } catch (error) {
            console.error('Error al crear/actualizar carta de gestión:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Obtener cartas con stock bajo
    public static getCartasStockBajo = async (req: Request, res: Response) => {
        try {
            const cartas = await CartaGestionModel.findAll({
                where: { 
                    estadoStock: 'bajo',
                    activaVenta: true 
                },
                order: [['stock_local', 'ASC']]
            });

            res.json({
                success: true,
                data: cartas
            });
        } catch (error) {
            console.error('Error al obtener cartas con stock bajo:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Actualizar stock de una carta
    public static updateStock = async (req: Request, res: Response) => {
        try {
            const { idGestion } = req.params;
            const { stockLocal } = req.body;

            const carta = await CartaGestionModel.findByPk(idGestion);
            if (!carta) {
                return res.status(404).json({
                    success: false,
                    message: 'Carta no encontrada en gestión'
                });
            }

            // Determinar estado del stock
            let estadoStock = 'normal';
            if (stockLocal < 5) estadoStock = 'bajo';
            else if (stockLocal < 15) estadoStock = 'medio';

            await carta.update({
                stockLocal,
                estadoStock
            });

            res.json({
                success: true,
                message: 'Stock actualizado correctamente',
                data: carta
            });
        } catch (error) {
            console.error('Error al actualizar stock:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    // Toggle activa_venta
    public static toggleActivaVenta = async (req: Request, res: Response) => {
        try {
            const { idGestion } = req.params;

            const carta = await CartaGestionModel.findByPk(idGestion);
            if (!carta) {
                return res.status(404).json({
                    success: false,
                    message: 'Carta no encontrada en gestión'
                });
            }

            await carta.update({
                activaVenta: !carta.activaVenta
            });

            res.json({
                success: true,
                message: `Carta ${carta.activaVenta ? 'activada' : 'desactivada'} para venta`,
                data: carta
            });
        } catch (error) {
            console.error('Error al cambiar estado de venta:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
}