const Sequelize = require('sequelize')
const ProductoModel = require('./models/Productos')
const MedidaModel = require('./models/Medidas');
const EmpaqueModel = require('./models/Empaque');
const CategoriaModel = require('./models/Categorias');
const MovimientoModel = require('./models/Movimientos');
const UsuarioModel = require('./models/Usuario');

const DBURL = 'mysql://root:root@localhost:3306/delebritex'
const sequelize = new Sequelize(DBURL)
const Producto = ProductoModel(sequelize, Sequelize);
const Medida = MedidaModel(sequelize, Sequelize);
const Empaque = EmpaqueModel(sequelize, Sequelize);
const Categoria = CategoriaModel(sequelize, Sequelize);
const Movimiento = MovimientoModel(sequelize, Sequelize);
const Usuario = UsuarioModel(sequelize, Sequelize);


sequelize.sync().then(() => {
    console.log('Tabla creada')

    Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
    Producto.belongsTo(Empaque, { foreignKey: 'empaqueId', as: 'empaque' });
    Producto.belongsTo(Medida, { foreignKey: 'medidaId', as: 'medida' });
    Movimiento.belongsTo(Producto, {foreignKey:'productoId', as: 'producto'});



})



module.exports = {
    Producto, Medida, Empaque, Categoria, Movimiento, Usuario
}