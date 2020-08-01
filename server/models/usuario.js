const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

//Defino los datos que va a tener el usuario en la base de datos
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La constraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//Modicamos el toJSON para que cuando se imprima no muestre el password
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

module.exports = mongoose.model('Usuario', usuarioSchema);