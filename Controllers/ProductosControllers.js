import { Producto, Categoria, Empaque, Medida } from '../sequelize';
import * as producto from '../services/producto.services';
import * as movimiento from '../services/movimiento.service';

export const crear = async (req, res) => {
    const body = req.body;
    console.log(body);
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
        const producto = await Producto.findOne({ where: { id: id } });
        const totalUnidadAntes = producto.totalUnidad;
        // console.log(totalUnidadAntes);

        const productodb = await Producto.findOne({ where: { id: id } }).then((producto) => {
            producto.update(nuevosDatos).then((nuevosDatos) => {
                const totalUnidadAhora = nuevosDatos.totalUnidad;
                if (totalUnidadAntes !== totalUnidadAhora) {
                    const diferencia = totalUnidadAhora - totalUnidadAntes;
                    if (diferencia == 1) {
                        movimiento.crear(nuevosDatos.id, 'suma', diferencia, nuevosDatos.updatedAt);
                    } else {
                        movimiento.crear(nuevosDatos.id, 'resta', Math.abs(diferencia), nuevosDatos.updatedAt);
                    }
                }
                res.json(nuevosDatos);
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'Hubo un error',
            error,
        });
    }
};

export const eliminar = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const productodb = await Producto.destroy({ where: { id: id } });
        if (!productodb) {
            res.status(500).json({
                mensaje: 'El producto no se encuentra',
            });
        }
        res.json(productodb);
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
    buscarSegunId,
    editar,
    eliminar,
};
