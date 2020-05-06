import { Usuario } from '../sequelize';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import { v4 as uuid } from 'uuid';
import * as token from '../services/usuario.service';

process.env.SECRET_KEY = 'secret';

export const crear = async (req, res) => {
    const today = new Date();
    const token = uuid();
    try {
        const usuariodb = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contraseña: req.body.contraseña,
            created: today,
            token: token,
        };

        // console.log(userData);

        var BCRYPT_SALT_ROUNDS = 12;
        const userdb = await Usuario.findOne({ where: { email: req.body.email } });
        // console.log(userdb);
        if (!userdb) {
            try {
                bcrypt.hash(usuariodb.contraseña, BCRYPT_SALT_ROUNDS, async (err, hash) => {
                    try {
                        usuariodb.contraseña = hash;
                        let nuevo_user = await Usuario.create(usuariodb);
                        res.status(200).json(nuevo_user);
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

export const login = async (req, res) => {
    try {
        const usuariodb = await Usuario.findOne({ where: { email: req.body.email } });
        if (bcrypt.compareSync(req.body.contraseña, usuariodb.contraseña)) {
            const token = uuid();
            usuariodb.update({ token: token });
            res.json(usuariodb);
        } else {
            res.send('El usuario no existe');
        }
    } catch (error) {
        console.log(error);
    }
};
export const buscarSegunToken = async (req, res) => {
    const token = req.params.token;
    try {
        const usuariodb = await Usuario.findOne({ where: { token: token }, attributes: { exclude: ['contraseña'] } });
        res.json(usuariodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'Hubo un problema' });
    }
};
export const buscarSegunId = async (req, res) => {
    const id = req.params.id;
    try {
        const usuariodb = await Usuario.findOne({ where: { id: id }, attributes: { exclude: ['contraseña'] } });
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

export const eliminarToken = async (req, res) => {
    const body = req.body;
    const tokenUser = body['token'];
    console.log(tokenUser);
    try {
        const usuariodb = await token.borrar(tokenUser);
        res.json(usuariodb);
    } catch (error) {
        console.log(error);
    }
};

export default {
    crear,
    buscarSegunToken,
    buscarSegunId,
    login,
    eliminar,
    editar,
    eliminarToken,
};
