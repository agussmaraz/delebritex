import {Producto} from '../sequelize';

export const confirmarCantidades = async (producto) => {
    let errores = [];
    for (let index = 0; index < producto.length; index++) {
        const element = producto[index];
        const productosdb = await Producto.findOne({ where: { id: element.id } });
        if (productosdb.totalUnidad < element.totalUnidad) {
            let producto = element.nombre;
            errores.push(producto + ' no tiene disponible esas cantidades')
        }
    }
    return errores;
};
