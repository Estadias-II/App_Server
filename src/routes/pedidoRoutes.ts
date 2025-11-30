// backend/routes/pedidoRoutes.ts
import { Router } from "express";
import { PedidoController } from "../controllers/PedidoController";
import { validarJWT } from "../middlewares/validarJWT";

export const router = Router();

// Todas las rutas requieren autenticación
router.use(validarJWT);

// POST - Crear pedido desde carrito
router.post('/', PedidoController.crearPedido);

// GET - Obtener pedidos del usuario
router.get('/mis-pedidos', PedidoController.getPedidosUsuario);

// GET - Obtener todos los pedidos (admin)
router.get('/admin/todos', PedidoController.getAllPedidos);

// PUT - Actualizar estado del pedido (admin)
router.put('/admin/:idPedido/estado', PedidoController.updateEstadoPedido);

// GET - Estadísticas de pedidos (admin)
router.get('/admin/estadisticas', PedidoController.getEstadisticas);

export default router;