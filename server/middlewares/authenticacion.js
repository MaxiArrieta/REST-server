const jwt = require('jsonwebtoken');


// ==================================
// Verioficar Token
// ==================================
let verificarToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err,
            });
        }
        //decoded seria el payload
        req.usuario = decoded.usuario;
        next();
    });

};

module.exports = verificarToken;