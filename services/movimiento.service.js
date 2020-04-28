import {Movimiento} from '../sequelize';
import Producto from '../models/Productos';

export const crear = async(producto, accion, valor, fecha) => {
    let nuevo_movimiento = await Movimiento.create({
        productoId: producto,
        accion: accion,
        valor: valor,
        fecha: fecha
    });
    return nuevo_movimiento;
}

export const buscar = async(producto) => {
    let movimiento = await Movimiento.find({producto: producto});
    return movimiento;
}