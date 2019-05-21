const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    issn: {type: Number, required: true},
    nombre: {type: String, required: true},
    tema: {type: String, required: true},
    descripcion: {type: String, required: true},
    libreria: {type: String, required: true},
    cantidadVendida: {type:Number, required: true},
    cantidadDisponible: {type: Number, required: true},
    foto: {type: String, required: true},
    precioDolares: {type: Number, required: true}
});

module.exports = mongoose.model('Books',BookSchema);
//El parametro 'Book' es el nombre de la colleccion en la DB

