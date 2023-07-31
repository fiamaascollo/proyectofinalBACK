const mongoose = require('mongoose');
const { Schema } = require('mongoose');

//configuramos con Schema nuestra collección de db
const userSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true,
    },
    telefono: {
        type: String, 
        required: true
    },
    horario: {
        type: String, 
        required: true
    },
    timestamp: {
        type: Date,
        default: new Date(),
    }
});

//exportamos la configuración con el nombre de la colección
module.exports = mongoose.model('AppFinal', userSchema);