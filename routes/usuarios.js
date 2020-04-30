const express = require('express');
const router = express.Router();
import UsuarioController from '../Controllers/UsuarioController';


router.post('/register', UsuarioController.crear);
router.post('/login', UsuarioController.login);
router.get('/usuario/:id', UsuarioController.buscarSegunId);
router.put('/usuario/:id', UsuarioController.editar);
router.delete('/usuario/:id', UsuarioController.eliminar);

module.exports = router;