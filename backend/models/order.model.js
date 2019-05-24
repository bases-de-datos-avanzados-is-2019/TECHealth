const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    IdPedido: {type: Number, required: true},
    IdCliente: {type: String, required: true},
    fechaRealizacion: {type: Date, required: true, default: Date.now},
    libros: {type: [String], required: true},
    montoTotal: {type: Number, required: true},
    estado: {type: String, required: true, default: 'Pendiente'},
    direccionEntrega: {type: String, required: true},
    fechaEntrega: {type: Date, required: false}
});

module.exports = mongoose.model('Order', OrderSchema);
//El parametro 'Order' es el nombre de la colleccion en la DB