module.exports = (sequelize, type) => {
    const Empaques = sequelize.define('Empaques', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER,
        },
        nombre: {
            type: type.STRING,
        },
    });
    return Empaques;
};
