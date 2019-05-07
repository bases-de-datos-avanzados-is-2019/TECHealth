const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    IdPedido: {type: String, required: true},
    IdCliente: {type: String, required: true},
    fechaRealizacion: {type: Date, required: true},
    libros: {type: [String], required: true},
    montoTotal: {type: Number, required: true},
    estado: {type: String, required: true},
    direccionEntrega: {type: String, required: true},
    fechaEntrega: {type: Date, required: false}
});

module.exports = mongoose.model('Order', OrderSchema);
//El parametro 'Order' es el nombre de la colleccion en la DB