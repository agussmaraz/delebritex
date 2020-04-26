module.exports = (sequelize, type) => {
    const Empaques = sequelize.define('Empaques', {
        nombre: {
            type: type.STRING
        }
    })
    return Empaques
}