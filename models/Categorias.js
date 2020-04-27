module.exports = (sequelize, type) => {
    const Categorias = sequelize.define('Categorias', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER
        },
        nombre: {
            type: type.STRING
        }
    })
    return Categorias
}