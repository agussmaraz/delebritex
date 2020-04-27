module.exports = (sequelize, type) => {
    const Medidas = sequelize.define('Medidas', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER,
        },
        medida: {
            type: type.STRING,
        },
    });
    return Medidas;
};
