const express = require('express');
const router = express.Router();
import ProductosController from '../controllers/ProductosControllers';


router.post('/nuevoProducto', ProductosController.crear);
router.get('/producto/:slug', ProductosController.buscarSegunId);
router.get('/producto', ProductosController.buscar);
router.put('/editarProducto/:id', ProductosController.editar);
router.delete('/eliminarProducto/:id', ProductosController.eliminar);

module.exports = router;