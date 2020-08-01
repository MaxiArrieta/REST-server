const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const verificarToken = require("../middlewares/authenticacion");

const app = express();

app.get("/usuario", verificarToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 3;
    limite = Number(limite);

    Usuario.find({}, "nombre email estado google img")
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Usuario.count({}, (err, count) => {
                res.json({
                    ok: true,
                    usuarios,
                    total: count,
                });
            });
        });
});

app.put("/usuario/:id", verificarToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["nombre", "email", "img", "estado"]);

    Usuario.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true },
        (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                usuario: usuarioDB,
            });
        }
    );
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
})

app.delete('/usuario', (req, res) => {
    res.json('delete usuarios');
})

module.exports = app;