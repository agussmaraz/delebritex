module.exports = (sequelize, type) => {
    const Usuarios = sequelize.define('Usuarios', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER
        },
        nombre: {
            type: type.STRING
        },
        apellido: {
            type: type.STRING
        },
        email: {
            type: type.STRING
        },
        contraseña: {
            type: type.STRING
        },
        estado: {
            type: type.INTEGER,
            defaultValue: 1
        }, 
        token: {
            type: type.STRING
        }
    })
    return Usuarios;
}