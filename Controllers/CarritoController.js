import { Carrito, Usuario } from '../sequelize';

export const crear = async (req, res) => {
    // console.log(req.body);
    const numero = Math.round(Math.random() * 1000);
    console.log(req.body)
    const body = req.body.map((producto) => {
        const producto_nuevo = {
            producto: producto.nombre,
            unidades: producto.totalUnidad,
            precioUnidad: producto.precioUnidad,
            precioTotal: producto.precioUnidad * producto.totalUnidad,
            numeroCompra: numero,
            usuarioId: producto.usuarioId,
            imagen: producto.imagen,
        };
        return producto_nuevo;
    });
    try {
        const carrito = [];
        for (let i = 0; i < body.length; i++) {
            const productos = body[i];
            const carritodb = await Carrito.create(productos);
            carrito.push(carritodb);
        }
        return res.status(200).json(carrito);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'Hubo un problema' });
    }
};

export const buscarSegunId = async (req, res) => {
    try {
        const id = req.params.id;
        const carritodb = await Carrito.findAll({ where: { usuarioId: id }, include: [{ model: Usuario, as: 'usuario' }] });
        return res.status(200).json(carritodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'Hubo un error' });
    }
};

export const buscar = async (req, res) => {
    try {
        const carritodb = await Carrito.findAll({ include: [{ model: Usuario, as: 'usuario' }] });
        return res.status(200).json(carritodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'Hubo un error al traer las reservas' });
    }
};

export const numeroCompra = async (req, res) => {
    const numero = req.params.numeroCompra;
    try {
        const carritodb = await Carrito.findAll({ where: { numeroCompra: numero }, include: [{ model: Usuario, as: 'usuario' }] });
        return res.status(200).json(carritodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'Hubo un error' });
    }
};

export const editar = async (req, res) => {
    const body = req.body;
    console.log(body);
    const numeroCompra = req.params.numero;
    console.log(numeroCompra);
    try {
        const carritodb = await Carrito.findAll({ where: { numeroCompra: numeroCompra } });
        carritodb.forEach((element) => {
            element.update(body);
            console.log(element);
        });
        return res.json(carritodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'El carrito no se pudo editar' });
    }
};

export const eliminar = async (req, res) => {
    const numero = req.params.numero;
    try {
        const carritodb = await Carrito.destroy({ where: { numeroCompra: numero } });
        if (!carritodb) {
            res.status(500).json({
                mensaje: 'El producto no se encuentra',
            });
        }
        res.json(numero);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'No se pudo eliminar el carrito' });
    }
};

export default {
    crear,
    buscarSegunId,
    buscar,
    numeroCompra,
    editar,
    eliminar,
};
