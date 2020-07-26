const express =  require('express');
const app = express();
const bodyParser = require('body-parser');

require('./config/config.js');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/usuario', (req, res) => {
    res.json('get usuarios');
})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
})

app.post('/usuario', (req, res) => {
    let {nombre, edad} = req.body;

    if(nombre === undefined || edad === undefined
     || nombre === '' || edad === ''){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre y la edad son datos necesarios'
        });
    } else {
        res.status(200).json({
            nombre,
            edad
        })
    }    
})

app.delete('/usuario', (req, res) => {
    res.json('delete usuarios');
})

//const port = process.env.PORT || 3000;

app.listen(process.env.PORT , () => {
    console.log(`server en puerto ${process.env.PORT }`);
});