module.exports = (sequelize, type) => {
    const Productos = sequelize.define(
        'Productos',
        {
            nombre: {
                type: type.STRING,
            },
            totalUnidad: {
                type: type.STRING,
            },
            medida: {
                type: type.STRING,
            },
            empaque: {
                type: type.STRING,
            },
        },
        {
            timestamps: true,
            tableName: "productos"
        })
        return Productos
};
