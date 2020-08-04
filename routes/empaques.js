const express = require('express');
const router = express.Router();
import EmpaqueController from '../controllers/EmpaqueController';

router.post('/empaque', EmpaqueController.crear);
router.get('/empaqueBuscar', EmpaqueController.buscar);

module.exports = router;