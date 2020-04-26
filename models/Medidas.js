module.exports = (sequelize, type) => {
    const Medidas = sequelize.define('Medidas', {
        medida: {
            type: type.STRING,
        }
    })
    return Medidas
};
