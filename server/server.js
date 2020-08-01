const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./config/config.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//Configuracion global de rutas
app.use(require('./routes/index'));

mongoose.connect(
    process.env.URLDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    },
    (err, res) => {
        if (err) throw err;

        console.log("Conectado a Base de Datos");
    }
);

app.listen(process.env.PORT, () => {
    console.log(`server en puerto ${process.env.PORT }`);
});