const express = require('express');
const router = express.Router();
import CarritoController from '../Controllers/CarritoController';


router.post('/nuevo-carrito', CarritoController.crear);
// router.get('/carrito', CarritoController.buscar);
router.get('/carrito/:id', CarritoController.buscarSegunId);

module.exports = router;