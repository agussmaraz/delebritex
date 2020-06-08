module.exports = (sequelize, type) => {
    const Carritos = sequelize.define(
        'Carritos',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: type.INTEGER,
            },
            producto: {
                type: type.STRING,
            },
            unidades: {
                type: type.INTEGER,
            },
            unidadPorEmpaque: {
                type: type.INTEGER
            },
            empaques: {
                type: type.INTEGER,
            },
            numeroCompra: {
                type: type.INTEGER,
            },
            precioUnidad: {
                type: type.INTEGER,
            },
            precioBulto: {
                type: type.INTEGER
            },
            precioTotal: {
                type: type.INTEGER,
            },
            usuarioId: {
                type: type.STRING,
            },
            imagen: {
                type: type.STRING,
            },
            estado: {
                type: type.INTEGER,
                defaultValue: 1,
            },
        },
        {
            tableName: 'Carritos',
        }
    );
    return Carritos;
};
