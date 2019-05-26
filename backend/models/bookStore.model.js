const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookStoreSchema = new Schema({
    codigo: {type: Number, required: true},
    nombre: {type: String, required: true},
    pais: {type: String, required: true},
    detalleUbicacion: {type: String, required: true},
    telefono: {type: String, required: true},
    horario: {type: String, required: true}
})

module.exports = mongoose.model('BookStore', BookStoreSchema);
//El parametro 'BookStore' es el nombre de la colleccion en la DB

