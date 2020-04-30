import { Usuario } from '../sequelize';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

process.env.SECRET_KEY = 'secret';

export const crear = async(req, res) => {
    const today = new Date();
    try {
        const usuariodb = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contraseña: req.body.contraseña,
            created: today,
        };
        // console.log(userData);

        var BCRYPT_SALT_ROUNDS = 12;
        const userdb = await Usuario.findOne({where: {email: req.body.email}  });
        // console.log(userdb);
        if (!userdb) {
            try {
                bcrypt.hash(usuariodb.contraseña, BCRYPT_SALT_ROUNDS, (err, hash) => {
                    try {
                        usuariodb.contraseña = hash;
                        Usuario.create(usuariodb);
                        res.status(200).json({ mensaje: 'Se ha registrado con exito' });
                    } catch (error) {
                        console.log(error);
                        res.status(409).json({ mensaje: 'Hubo un problema al registrarse' });
                    }
                });
            } catch (error) {
                console.log(error);
                res.status(409).json({ mensaje: 'Hubo un problema al registrarse' });
            }
        } else {
            res.status(500).json({
                mensaje: 'El usuario ya se encuentra registrado',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(409).json({ mensaje: 'Hubo un problema al registrarse' });
    }
};

export const login = (req, res) => {
    Usuario.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (bcrypt.compareSync(req.body.contraseña, user.contraseña)) {
                const payload = {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email,
                };
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440,
                });
                res.json({ token: token });
            } else {
                res.send('El usuario no existe');
            }
        })
        .catch((error) => {
            console.log(error)
            res.send('error: ' + error);
        });
};

export const buscarSegunId = async (req, res) => {
    const id = req.params.id;
    try {
        const usuariodb = await Usuario.findOne({ where: { id: id } });
        res.json(usuariodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'Hubo un problema' });
    }
};

export const editar = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        Usuario.findOne({ where: { id: id } }).then((usuario) => {
            usuario.update(body).then((body) => {
                res.json(body);
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'Hubo un problema para editar' });
    }
};

export const eliminar = async (req, res) => {
    const id = req.params.id;
    try {
        const usuariodb = await Usuario.destroy({ where: { id: id } });
        if (!usuariodb) {
            res.status(500).json({
                mensaje: 'No se encontro el usuario',
            });
        }
        res.json(usuariodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'No se pudo eliminar el usuario' });
    }
};

export default {
    crear,
    buscarSegunId,
    login,
    eliminar,
    editar,
};
