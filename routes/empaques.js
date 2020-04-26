const express = require('express');
const router = express.Router();
import EmpaqueController from '../Controllers/EmpaqueController';

router.post('/empaque', EmpaqueController.crear);
router.get('/empaqueBuscar', EmpaqueController.buscar);

module.exports = router;