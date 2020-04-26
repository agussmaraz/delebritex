const express = require('express');
const router = express.Router();
import CategoriaController from '../Controllers/CategoriaController';

router.post('/categoria', CategoriaController.crear);
router.get('/categoriaBuscar', CategoriaController.buscar);

module.exports = router;