module.exports = (sequelize, type) => {
    const Productos = sequelize.define(
        'Productos',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: type.INTEGER,
            },
            nombre: {
                type: type.STRING,
            },
            totalUnidad: {
                type: type.STRING,
            },
            medidaId: {
                type: type.STRING,
            },
            empaqueId: {
                type: type.STRING,
            },
            pesoUnidad: {
                type: type.STRING,
            },
            unidadPorEmpaque: {
                type: type.STRING,
            },
            categoriaId: {
                type: type.INTEGER,
            },
            slug: {
                type: type.STRING,
            },
            imagen: {
                type: type.STRING,
            },
        },
        {
            timestamps: true,
            tableName: 'Productos',
        }
    );

    return Productos;
};
