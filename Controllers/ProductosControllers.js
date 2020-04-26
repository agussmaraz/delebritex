import { Producto } from '../sequelize';

export const crear = async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
        const productodb = await Producto.create(body);
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
        const productodb = await Producto.findAll();
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
        const productodb = await Producto.findOne({ where: { id: id } });
        res.json(productodb);
    } catch (error) {
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
        const productodb = await Producto.findOne({ where: { id: id } }).then((producto) => {
            producto.update(nuevosDatos).then((nuevosDatos) => {
                res.json(nuevosDatos);
            });
        });
    } catch (error) {
        console.log(error)
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
            res.status(400).json({
                mensaje: 'No se encontro el producto con ese id',
                error,
            });
        }
        res.json(productodb);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mensaje: 'Hubo un problema para eliminar el producto',
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
