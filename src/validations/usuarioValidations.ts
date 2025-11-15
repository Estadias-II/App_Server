import { body, param } from "express-validator";

export const createUsuarioValidations = [
    body('nombres')
        .notEmpty().withMessage('Los nombres son requeridos')
        .isLength({ max: 250 }).withMessage('Los nombres no pueden tener más de 250 caracteres'),
    
    body('apellidos')
        .notEmpty().withMessage('Los apellidos son requeridos')
        .isLength({ max: 250 }).withMessage('Los apellidos no pueden tener más de 250 caracteres'),
    
    body('fechaNacimiento')
        .notEmpty().withMessage('La fecha de nacimiento es requerida')
        .isDate().withMessage('La fecha de nacimiento debe ser una fecha válida'),
    
    body('correo')
        .notEmpty().withMessage('El correo electrónico es requerido')
        .isEmail().withMessage('Debe ser un correo electrónico válido')
        .isLength({ max: 250 }).withMessage('El correo no puede tener más de 250 caracteres'),
    
    body('pais')
        .notEmpty().withMessage('El país es requerido')
        .isLength({ max: 100 }).withMessage('El país no puede tener más de 100 caracteres'),
    
    body('ciudad')
        .notEmpty().withMessage('La ciudad es requerida')
        .isLength({ max: 100 }).withMessage('La ciudad no puede tener más de 100 caracteres'),
    
    body('codigoPostal')
        .notEmpty().withMessage('El código postal es requerido')
        .isLength({ max: 45 }).withMessage('El código postal no puede tener más de 45 caracteres'),
    
    body('usuario')
        .notEmpty().withMessage('El nombre de usuario es requerido')
        .isLength({ max: 250 }).withMessage('El usuario no puede tener más de 250 caracteres'),
    
    body('contraseña')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .isLength({ max: 250 }).withMessage('La contraseña no puede tener más de 250 caracteres')
];

export const updateUsuarioValidations = [
    param('id')
        .isInt().withMessage('ID debe ser un número entero'),
    
    body('nombres')
        .optional()
        .isLength({ max: 250 }).withMessage('Los nombres no pueden tener más de 250 caracteres'),
    
    body('apellidos')
        .optional()
        .isLength({ max: 250 }).withMessage('Los apellidos no pueden tener más de 250 caracteres'),
    
    body('fechaNacimiento')
        .optional()
        .isDate().withMessage('La fecha de nacimiento debe ser una fecha válida'),
    
    body('pais')
        .optional()
        .isLength({ max: 100 }).withMessage('El país no puede tener más de 100 caracteres'),
    
    body('ciudad')
        .optional()
        .isLength({ max: 100 }).withMessage('La ciudad no puede tener más de 100 caracteres'),
    
    body('codigoPostal')
        .optional()
        .isLength({ max: 45 }).withMessage('El código postal no puede tener más de 45 caracteres')
];

export const idValidation = [
    param('id')
        .isInt().withMessage('ID debe ser un número entero')
];

export const loginValidations = [
    body('correo')
        .notEmpty().withMessage('El correo electrónico es requerido')
        .isEmail().withMessage('Debe ser un correo electrónico válido'),
    
    body('contraseña')
        .notEmpty().withMessage('La contraseña es requerida')
];