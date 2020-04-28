module.exports = (sequelize, type) => {
    const Movimientos = sequelize.define('Movimientos', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER
        },
        productoId: {
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