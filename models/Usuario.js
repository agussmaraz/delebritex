module.exports = (sequelize, type) => {
    const Usuarios = sequelize.define('Usuarios', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER,
        },
        nombre: {
            type: type.STRING,
            required: true,
        },
        apellido: {
            type: type.STRING,
            required: true,
        },
        email: {
            type: type.STRING,
            required: true,
        },
        contraseña: {
            type: type.STRING,
            required: true,
        },
        estado: {
            type: type.INTEGER,
            defaultValue: 1,
        },
        token: {
            type: type.STRING,
        },
       
    });
    return Usuarios;
};
