const express = require('express');
const router = express.Router();
import MedidaController from '../Controllers/ProductosControllers'

router.post('/media', MedidaController.crear);

module.exports = router