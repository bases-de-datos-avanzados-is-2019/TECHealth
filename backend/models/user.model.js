const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;


const UserSchema = new Schema({
    nombre: {type: String},
    primerApellido: {type: String},
    segundoApellido: {type: String},
    cedula: {type: Number},
    fechaNacimiento: {type: String},
    tipoUsuario: {type: String},
    ubicacion: {type: String},
    correoElectronico: {type: String},
    nombreUsuario: {type: String},
    password: {type: String},
    telefonos: {type: [String]},
    libreria: {type: String}
});

UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
//El parametro 'User' es el nombre de la colleccion en la DB