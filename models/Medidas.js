module.exports = (sequelize, type) => {
    const Medidas = sequelize.define('medida', {
        medida: {
            type: type.STRING,
        }
    })
    return MediaDevices
};
