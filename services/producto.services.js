import { Producto } from "../sequelize";

export const crear = async (data) => {
    let nuevo_producto = await Producto.create(data);

    return nuevo_producto;
};
