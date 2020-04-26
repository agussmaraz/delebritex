const express = require('express');
const router = express.Router();
import MedidaController from '../Controllers/MedidaController'

router.post('/medida', MedidaController.crear);
router.get('/buscarMedida', MedidaController.buscar);

module.exports = router