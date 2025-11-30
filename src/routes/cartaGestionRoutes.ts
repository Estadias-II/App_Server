// backend/routes/cartaGestionRoutes.ts - ACTUALIZADO
import { Router } from "express";
import { CartaGestionController } from "../controllers/CartaGestionController";
import { validarJWT } from "../middlewares/validarJWT";
import { 
    upsertCartaGestionValidations, 
    updateStockValidations,
    updatePrecioValidations,
    idGestionValidation 
} from "../validations/cartaGestionValidations";
import { verifyRequestErrors } from "../middlewares/verifyRequestErrors";

export const router = Router();

// TODAS las rutas requieren autenticación JWT
router.use(validarJWT);

// GET - Obtener todas las cartas con gestión
router.get('/', CartaGestionController.getAllCartasGestion);

// GET - Obtener gestión de una carta específica por ID Scryfall
router.get('/:idScryfall', CartaGestionController.getCartaGestion);

// GET - Obtener cartas con stock bajo
router.get('/stock/bajo', CartaGestionController.getCartasStockBajo);

// POST - Crear o actualizar gestión de carta
router.post('/', upsertCartaGestionValidations, verifyRequestErrors, CartaGestionController.upsertCartaGestion);

// PUT - Actualizar stock de una carta
router.put('/:idGestion/stock', updateStockValidations, verifyRequestErrors, CartaGestionController.updateStock);

// PUT - Actualizar precio personalizado
router.put('/:idGestion/precio', updatePrecioValidations, verifyRequestErrors, CartaGestionController.updatePrecio);

// PATCH - Toggle activa_venta
router.patch('/:idGestion/toggle-venta', idGestionValidation, verifyRequestErrors, CartaGestionController.toggleActivaVenta);

export default router;