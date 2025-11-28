import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { 
    createUsuarioValidations, 
    updateUsuarioValidations, 
    updatePasswordValidations,
    idValidation, 
    loginValidations, 
    createAdminValidations,
    updateRoleValidations
} from "../validations/usuarioValidations";
import { verifyRequestErrors } from "../middlewares/verifyRequestErrors";
import { validarJWT } from "../middlewares/validarJWT";

export const router = Router();

// GET - Obtener perfil del usuario autenticado
router.get('/perfil', validarJWT, UsuarioController.getPerfil);

// GET - Obtener datos completos del usuario autenticado
router.get('/perfil/completo', validarJWT, UsuarioController.getPerfilCompleto);

// PUT - Actualizar perfil del usuario autenticado
router.put('/perfil', validarJWT, updateUsuarioValidations, verifyRequestErrors, UsuarioController.updatePerfil);

// PUT - Cambiar contraseña del usuario autenticado
router.put('/perfil/password', validarJWT, updatePasswordValidations, verifyRequestErrors, UsuarioController.updatePassword);

// GET - Obtener usuario por ID
router.get('/:id', validarJWT, idValidation, verifyRequestErrors, UsuarioController.getUsuarioById);

// POST - Crear nuevo usuario
router.post('/', createUsuarioValidations, verifyRequestErrors, UsuarioController.createUsuario);

// POST - Login de usuario
router.post('/login', loginValidations, verifyRequestErrors, UsuarioController.login);

// PUT - Actualizar usuario
router.put('/:id', updateUsuarioValidations, verifyRequestErrors, UsuarioController.updateUsuario);

// DELETE - Eliminar usuario
router.delete('/:id', idValidation, verifyRequestErrors, UsuarioController.deleteUsuario);

router.get('/admin/usuarios', validarJWT, UsuarioController.getAllUsuariosAdmin);

// POST - Crear nuevo admin (solo superadmin)
router.post('/admin/crear', validarJWT, createAdminValidations, verifyRequestErrors, UsuarioController.createAdmin);

// PUT - Cambiar rol de usuario (solo superadmin)
router.put('/admin/usuario/:id/rol', validarJWT, updateRoleValidations, verifyRequestErrors, UsuarioController.updateUserRole);