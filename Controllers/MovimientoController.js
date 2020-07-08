import { Movimiento, Producto } from '../sequelize';
import { buscar } from '../services/movimiento.service';
// import { crear } from '../services/movimiento.service';

export const nuevoMovimiento = async (req, res) => {
    try {
        const productos = req.body.productos;
        const movimientos = [];

        for (let index = 0; index < productos.length; index++) {
            const element = productos[index];

            const buffer = {
                numeroCompra: element.numeroCompra,
                usuario: element.usuario.nombre,
                accion: 'Vendido',
                precioBulto: element.precioBulto,
                empaques: element.empaques,
                productos: element.producto,
                precioUnidad: element.precioUnidad,
                precioTotal: element.precioTotal,
                unidades: element.unidades,
                fecha: element.createdAt,
            };

            const movimientodb = await Movimiento.create(buffer);
            movimientos.push(movimientodb);
        }
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
