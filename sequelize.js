const Sequelize = require('sequelize')
const ProductoModel = require('./models/Productos')
const MedidaModel = require('./models/Medidas');
const EmpaqueModel = require('./models/Empaque');
const CategoriaModel = require('./models/Categorias');

const DBURL = 'mysql://root:root@localhost:8889/delebritex'
const sequelize = new Sequelize(DBURL)
const Producto = ProductoModel(sequelize, Sequelize);
const Medida = MedidaModel(sequelize, Sequelize);
const Empaque = EmpaqueModel(sequelize, Sequelize);
const Categoria = CategoriaModel(sequelize, Sequelize);

sequelize.sync().then(() => {
    console.log('Tabla creada')

    Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
    Producto.belongsTo(Empaque, { foreignKey: 'empaqueId', as: 'empaque' });
    Producto.belongsTo(Medida, { foreignKey: 'medidaId', as: 'medida' });



})



module.exports = {
    Producto, Medida, Empaque, Categoria
}