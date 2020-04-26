module.exports = (sequelize, type) => {
    const Categorias = sequelize.define('Categorias', {
        nombre: {
            type: type.STRING
        }
    })
    return Categorias
}