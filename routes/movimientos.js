const express = require('express');
const router = express.Router();
import MovimientosController from '../Controllers/MovimientoController';

router.get('/movimientos', MovimientosController.buscarMovimientos);
router.get('/movimientos/:id', MovimientosController.buscarSegunId);

module.exports = router;