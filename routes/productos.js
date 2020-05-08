const express = require('express');
const router = express.Router();
import ProductosController from '../controllers/ProductosControllers';
const multer = require('multer');
const upload = multer({dest: 'uploads/'})


router.post('/nuevoProducto', upload.single('imagen'), ProductosController.crear);
router.get('/producto/:id', ProductosController.buscarSegunId);
router.get('/producto/nombre/:slug', ProductosController.buscarSegunSlug);
router.get('/producto', ProductosController.buscar);
router.put('/editarProducto/:id', ProductosController.editar);
router.delete('/eliminarProducto/:id', ProductosController.eliminar);

module.exports = router;