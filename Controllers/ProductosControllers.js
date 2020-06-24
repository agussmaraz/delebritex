import { Producto, Categoria, Empaque, Medida, Movimiento } from '../sequelize';
import * as producto from '../services/producto.services';
import * as movimiento from '../services/movimiento.service';
const Slug = require('slug');

export const crear = async (req, res) => {
    const body = req.body;
    const pathOriginal = req.file.originalname;
    req.body.imagen = '/img/' + pathOriginal;
    const slug = Slug(req.body.slug);
    req.body.slug = slug;
    try {
        const productodb = await producto.crear(body);
        res.status(200).json(productodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'Hubo un error',
        });
    }
};
export const buscar = async (req, res) => {
    try {
        const productodb = await Producto.findAll({
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Empaque, as: 'empaque' },
                { model: Medida, as: 'medida' },
            ],
        });
        res.json(productodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'Hubo un problema',
            error,
        });
    }
};
export const buscarSegunSlug = async (req, res) => {
    const slug = req.params.slug;
    // console.log(slug);
    try {
        const productodb = await Producto.findOne({
            where: { slug: slug },
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Empaque, as: 'empaque' },
                { model: Medida, as: 'medida' },
            ],
        });
        res.json(productodb);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mensaje: 'Hubo un problema',
            error,
        });
    }
};
export const buscarSegunId = async (req, res) => {
    const id = req.params.id;
    try {
        const productodb = await Producto.findOne({
            where: { id: id },
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Empaque, as: 'empaque' },
                { model: Medida, as: 'medida' },
            ],
        });
        res.json(productodb);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mensaje: 'Hubo un problema',
            error,
        });
    }
};
export const editar = async (req, res) => {
    const nuevosDatos = req.body;
    const id = req.params.id;
    try {
        const productodb = await Producto.findOne({ where: { id: id } });
        productodb.update(nuevosDatos);

        res.json(productodb);
    } catch (error) {
        console.log(error);
    }
};
export const editarStock = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        for (let index = 0; index < body.length; index++) {
            const element = body[index];
            const productodb = await Producto.findOne({ where: { id: element.id } });
            const cantidades = Number(element.unidadPorEmpaque) * Number(element.empaques);
            const unidades = Number(element.totalUnidad);
            const unidad = Number(element.unidades);
            const buffer = {};

            if (element.empaques > 0) {
                buffer.totalUnidad = productodb.totalUnidad - Number(cantidades);
            } 
            
            if (element.totalUnidad > 0) {
                buffer.totalUnidad = productodb.totalUnidad - Number(unidades);
            } 
            // else if (element.empaques > 0 && element.totalUnidad > 0) {
            //     buffer.totalUnidad = productodb.totalUnidad - Number(cantidades);
            //     buffer.totalUnidad = productodb.totalUnidad - Number(unidades);
            // } 
            if (element.unidades > 0) {
                buffer.totalUnidad = productodb.totalUnidad - Number(unidad);
            } 
            // else if (element.empaques > 0 && element.unidades > 0) {
            //     buffer.totalUnidad = productodb.totalUnidad - Number(cantidades);
            //     buffer.totalUnidad = productodb.totalUnidad - Number(unidad);
            // }

            productodb.update(buffer);
            res.json(productodb);
        }
    } catch (error) {
        console.log(error);
        res.status(500).mensaje({ mensaje: 'Hubo un problema' });
    }
};

export const eliminar = async (req, res) => {
    const id = req.params.id;
    try {
        const productodb = await Producto.destroy({ where: { id: id } });
        movimiento.eliminar(id);
        if (!productodb) {
            res.status(500).json({
                mensaje: 'El producto no se encuentra',
            });
        }
        res.json(id);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error,
        });
    }
};

export default {
    crear,
    buscar,
    buscarSegunSlug,
    buscarSegunId,
    editar,
    eliminar,
    editarStock,
};
