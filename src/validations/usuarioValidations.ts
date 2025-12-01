// backend/validations/usuarioValidations.ts
import { body, param } from "express-validator";

// Función para validar código postal de forma flexible
const validarCodigoPostalFlexible = (value: string) => {
  if (!value) return false;
  
  // Limpiar y normalizar
  const codigoLimpio = value.trim().toUpperCase();
  
  // Validación básica: longitud entre 3 y 12 caracteres
  if (codigoLimpio.length < 3 || codigoLimpio.length > 12) {
    return false;
  }
  
  // Validación de caracteres permitidos
  const caracteresValidos = /^[A-Z0-9\-\s]*$/;
  if (!caracteresValidos.test(codigoLimpio)) {
    return false;
  }
  
  return true;
};

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
        .isLength({ max: 12 }).withMessage('El código postal no puede tener más de 12 caracteres')
        .custom(validarCodigoPostalFlexible).withMessage('Formato de código postal inválido'),
    
    body('usuario')
        .notEmpty().withMessage('El nombre de usuario es requerido')
        .isLength({ max: 250 }).withMessage('El usuario no puede tener más de 250 caracteres'),
    
    body('contraseña')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .isLength({ max: 250 }).withMessage('La contraseña no puede tener más de 250 caracteres')
];

export const updateUsuarioValidations = [
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
        .isLength({ max: 12 }).withMessage('El código postal no puede tener más de 12 caracteres')
        .custom(validarCodigoPostalFlexible).withMessage('Formato de código postal inválido')
];

export const updatePasswordValidations = [
    body('contraseñaActual')
        .notEmpty().withMessage('La contraseña actual es requerida'),
    
    body('nuevaContraseña')
        .notEmpty().withMessage('La nueva contraseña es requerida')
        .isLength({ min: 8 }).withMessage('La nueva contraseña debe tener al menos 8 caracteres')
        .isLength({ max: 250 }).withMessage('La nueva contraseña no puede tener más de 250 caracteres'),
    
    body('confirmarContraseña')
        .notEmpty().withMessage('La confirmación de contraseña es requerida')
        .custom((value, { req }) => {
            if (value !== req.body.nuevaContraseña) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        })
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

export const createAdminValidations = [
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
        .isLength({ max: 12 }).withMessage('El código postal no puede tener más de 12 caracteres')
        .custom(validarCodigoPostalFlexible).withMessage('Formato de código postal inválido'),
    
    body('usuario')
        .notEmpty().withMessage('El nombre de usuario es requerido')
        .isLength({ max: 250 }).withMessage('El usuario no puede tener más de 250 caracteres'),
    
    body('contraseña')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .isLength({ max: 250 }).withMessage('La contraseña no puede tener más de 250 caracteres')
];

export const updateRoleValidations = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID debe ser un número entero positivo'),
    
    body('rol')
        .notEmpty().withMessage('El rol es requerido')
        .isIn(['user', 'admin', 'superadmin']).withMessage('Rol debe ser: user, admin o superadmin')
];