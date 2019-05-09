const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    nombre: {type: String},
    primerApellido: {type: String},
    segundoApellido: {type: Stirng},
    cedula: {type: Number},
    fechaNacimiento: {type: String},
    tipoUsuario: {type: String},
    ubicacion: {type: String},
    correoElectronico: {type: String},
    nombreUsuario: {type: String},
    password: {type: String},
    telefonos: {type: [String]}
});

module.exports = mongoose.model('User', UserSchema);
//El parametro 'User' es el nombre de la colleccion en la DB