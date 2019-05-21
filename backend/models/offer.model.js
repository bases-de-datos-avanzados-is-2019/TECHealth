const mongoose = require('mongoose');
const { Schema } = mongoose;

const Offer = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    fechaInicio: {type: Date, required: true},
    fechaFinalizacion: {type: Date, required: true},
    porcentajeDescuento: {type: Number, required: true}
});

module.exports = mongoose.model('Offer',Offer);
//El parametro 'Offer' es el nombre de la colleccion en la DB

