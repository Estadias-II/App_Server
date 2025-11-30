import { Router } from "express";
import { CotizacionController } from "../controllers/CotizacionController";
import { validarJWT } from "../middlewares/validarJWT";
import { verifyAdmin } from "../middlewares/verifyAdmin";

export const router = Router();

// Todas las rutas requieren autenticación
router.use(validarJWT);

// Rutas de usuario
router.post('/solicitar', CotizacionController.crearSolicitud);
router.get('/mis-cotizaciones', CotizacionController.getCotizacionesUsuario);
router.put('/:idCotizacion/responder', CotizacionController.responderCotizacion);

// Rutas de administrador
router.get('/admin/todas', verifyAdmin, CotizacionController.getAllCotizaciones);
router.put('/admin/:idCotizacion', verifyAdmin, CotizacionController.actualizarCotizacion);
router.get('/admin/estadisticas', verifyAdmin, CotizacionController.getEstadisticas);

export default router;