const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

//BD
dbConnection();


//cors
app.use(cors());

app.use(express.static('public'));

//lectura y parseo del body

app.use(express.json());


//authentication
app.use('/api/auth', require('./routes/auth'));

//eventos
app.use('/api/events', require('./routes/events'));





app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
}); 