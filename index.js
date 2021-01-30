const express = require('express');
const cors = require('cors');

require('dotenv').config();

// Crear servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/v1/catalog', require('./routes/catalogo'));
app.use( '/api/v1/user', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});