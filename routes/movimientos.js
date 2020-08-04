const express = require('express');
const router = express.Router();
import MovimientosController from '../controllers/MovimientoController';

router.post('/movimiento', MovimientosController.nuevoMovimiento);
router.get('/movimientos', MovimientosController.buscarMovimientos);
router.get('/movimientos/:id', MovimientosController.buscarSegunId);

module.exports = router;