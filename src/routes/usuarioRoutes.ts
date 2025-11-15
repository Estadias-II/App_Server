import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { 
    createUsuarioValidations, 
    updateUsuarioValidations, 
    idValidation, 
    loginValidations 
} from "../validations/usuarioValidations";
import { verifyRequestErrors } from "../middlewares/verifyRequestErrors";

export const router = Router();

// GET - Obtener todos los usuarios
router.get('/', UsuarioController.getAllUsuarios);

// GET - Obtener usuario por ID
router.get('/:id', idValidation, verifyRequestErrors, UsuarioController.getUsuarioById);

// POST - Crear nuevo usuario
router.post('/', createUsuarioValidations, verifyRequestErrors, UsuarioController.createUsuario);

// POST - Login de usuario
router.post('/login', loginValidations, verifyRequestErrors, UsuarioController.login);

// PUT - Actualizar usuario
router.put('/:id', updateUsuarioValidations, verifyRequestErrors, UsuarioController.updateUsuario);

// DELETE - Eliminar usuario
router.delete('/:id', idValidation, verifyRequestErrors, UsuarioController.deleteUsuario);