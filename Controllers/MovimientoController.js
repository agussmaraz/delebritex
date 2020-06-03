import { Movimiento, Producto } from '../sequelize';
import { buscar } from '../services/movimiento.service';
// import { crear } from '../services/movimiento.service';

export const nuevoMovimiento = async (req, res) => {
    const productos = req.body.productos;
    const movimientos = [];

    for (let index = 0; index < productos.length; index++) {
        const element = productos[index];
        console.log(element);
        const buffer = {};
        buffer.numeroCompra = element.numeroCompra;
        buffer.usuario = element.usuario.nombre;
        buffer.accion = 'Vendido';
        buffer.productos = element.producto;
        buffer.precioUnidad = element.precioUnidad;
        buffer.precioTotal = element.precioTotal;
        buffer.valor = element.unidades;
        buffer.fecha = new Date();

        const movimientodb = await Movimiento.create(buffer);
        movimientos.push(movimientodb)
    }
    try {
        return res.json(movimientos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'No se pudo crear el movimiento correctamente' });
    }
};

export const buscarMovimientos = async (req, res) => {
    try {
        const movimientodb = await Movimiento.findAll();
        res.json(movimientodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'Hubo un problema para traer este producto',
            error,
        });
    }
};

export const buscarSegunId = async (req, res) => {
    try {
        const id = req.params.id;
        const movimientodb = await buscar(id);
        return movimientodb;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'no se encontro el producto' });
    }
};

export default {
    buscarMovimientos,
    buscarSegunId,
    nuevoMovimiento,
};
