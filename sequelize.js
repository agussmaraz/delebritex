const Sequelize = require('sequelize')
const ProductoModel = require('./models/Productos')


const DBURL = 'mysql://root:root@localhost:8889/delebritex'
const sequelize = new Sequelize(DBURL)
const Producto = ProductoModel(sequelize, Sequelize);

sequelize.sync().then(() => {
    console.log('Tabla creada')
})
module.exports = {
    Producto
}