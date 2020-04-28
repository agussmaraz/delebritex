import * as movimientos from './movimiento.service';
import {Producto} from '../sequelize';

export const crear = async(data) => {
    console.log()
    let nuevo_producto = await Producto.create(data);

    await movimientos.crear(nuevo_producto.id, 'creado', nuevo_producto.totalUnidad, nuevo_producto.createdAt);
    return nuevo_producto;
}