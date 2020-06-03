module.exports = (sequelize, type) => {
    const Movimientos = sequelize.define('Movimientos', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER
        },
        productos: {
            type: type.STRING
        },
        numeroCompra: {
            type: type.INTEGER
        },
        precioUnidad: {
            type: type.INTEGER
        },
        precioTotal: {
            type: type.INTEGER
        },
        usuario: {
            type: type.STRING
        },
        accion: {
            type: type.STRING
        },
        valor: {
            type: type.INTEGER
        },
        fecha: {
            type: type.DATE
        }
    })
    return Movimientos;
}