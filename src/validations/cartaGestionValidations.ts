// backend/validations/cartaGestionValidations.ts - ACTUALIZADO
import { body, param } from "express-validator";

export const upsertCartaGestionValidations = [
    body('idCartaScryfall')
        .notEmpty().withMessage('El ID de Scryfall es requerido')
        .isLength({ max: 100 }).withMessage('El ID de Scryfall no puede tener más de 100 caracteres'),
    
    body('nombreCarta')
        .notEmpty().withMessage('El nombre de la carta es requerido')
        .isLength({ max: 500 }).withMessage('El nombre no puede tener más de 500 caracteres'),
    
    body('activaVenta')
        .optional()
        .isBoolean().withMessage('activaVenta debe ser un valor booleano'),
    
    body('stockLocal')
        .optional()
        .isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo'),
    
    body('precioPersonalizado')
        .optional()
        .isFloat({ min: 0 }).withMessage('El precio personalizado debe ser un número positivo'),
    
    body('precioScryfall')
        .optional()
        .isFloat({ min: 0 }).withMessage('El precio Scryfall debe ser un número positivo'),
    
    body('categoriaPersonalizada')
        .optional()
        .isLength({ max: 100 }).withMessage('La categoría no puede tener más de 100 caracteres')
];

export const updateStockValidations = [
    param('idGestion')
        .isInt({ min: 1 }).withMessage('ID de gestión debe ser un número entero positivo'),
    
    body('stockLocal')
        .notEmpty().withMessage('El stock es requerido')
        .isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo')
];

export const updatePrecioValidations = [
    param('idGestion')
        .isInt({ min: 1 }).withMessage('ID de gestión debe ser un número entero positivo'),
    
    body('precioPersonalizado')
        .optional()
        .isFloat({ min: 0 }).withMessage('El precio personalizado debe ser un número positivo')
];

export const idGestionValidation = [
    param('idGestion')
        .isInt({ min: 1 }).withMessage('ID de gestión debe ser un número entero positivo')
];