const express = require('express');
const router = express.Router();
import CategoriaController from '../controllers/CategoriaController';

router.post('/categoria', CategoriaController.crear);
router.get('/categoriaBuscar', CategoriaController.buscar);

module.exports = router;