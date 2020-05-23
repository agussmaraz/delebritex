const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
    res.send('hola agus');
});
app.use(require('./routes/productos'));
app.use(require('./routes/medidas'));
app.use(require('./routes/empaques'));
app.use(require('./routes/categorias'));
app.use(require('./routes/movimientos'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/carrito'));



// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
    console.log('El server esta arriba');
});
