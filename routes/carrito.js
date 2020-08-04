const express = require('express');
const router = express.Router();
import CarritoController from '../controllers/CarritoController';


router.post('/nuevo-carrito', CarritoController.crear);
router.get('/carrito', CarritoController.buscar);
router.get('/carrito/:id', CarritoController.buscarSegunId);
router.get('/carrito/reserva/:numeroCompra', CarritoController.numeroCompra);
router.put('/carrito/:numero', CarritoController.editar);
router.delete('/carrito/:numero', CarritoController.eliminar);
module.exports = router;