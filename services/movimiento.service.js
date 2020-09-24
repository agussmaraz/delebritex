import { Movimiento } from "../sequelize";

export const crear = async (producto, accion, valor, numeroCompra) => {
    let nuevo_movimiento = await Movimiento.create({
        productoId: producto,
        accion: accion,
        valor: valor,
        numeroCompra: numeroCompra,
    });
    return nuevo_movimiento;
};

export const buscar = async (producto) => {
    let movimiento = await Movimiento.find({ producto: producto });
    return movimiento;
};

export const eliminar = async (id) => {
    let eliminarMovimiento = await Movimiento.destroy({ where: { productoId: id } });
    return eliminarMovimiento;
};
