const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const User = require('../models/user.model');
const Book = require('../models/book.model');

router.get('/', async(req,res) => {
    const orders = await Order.find().sort('-fechaRealizacion');
    res.json(orders);
});

router.get('/rangos', async(req,res) => {
    var clientes = await User.find({tipoUsuario: 'cliente'}, {'_id':1});
    const largo = clientes.length;
    var result = { resultado: []};
    for (var i = 0; i < largo; i++){
        var query = {IdCliente: clientes[i]._id};
        var ordenes = await Order.find(query);
        var largoOrdenes = ordenes.length;
        var numLibros = [];
        for (var j = 0; j < largoOrdenes; j++){
            numLibros.push(ordenes[j].libros.length);
        };
        var temp = {nombreUsuario: clientes[i].nombreUsuario, maxPedidos: Math.max(numLibros), minPedidos: Math.min(numLibros)};
        result.resultado.push(temp);
    };
    res.json(result);
    return;
});

router.get('/IdCliente/:id', async(req,res) => {
    const query = {IdCliente: req.params.id}
    const orders = await Order.find(query).sort('-fechaRealizacion');
    res.json(orders);
});

router.post('/:json', async (req, res) => {
    var IdPedido = 1;
    const orders = await Order.find();
    if(orders[0] !== undefined){
        IdPedido = orders[orders.length - 1].IdPedido + 1;
    }
    
    const parametros = JSON.parse(req.params.json);
    const {IdCliente, libros, montoTotal, direccionEntrega} = parametros;
    const newOrder = new Order({IdPedido, IdCliente, libros, montoTotal, direccionEntrega});
    await newOrder.save();
    res.json({mensaje: 'Orden guardada'});
    return
})

router.delete('/:id', async (req, res)=> {
    // await Order.findByIdAndDelete(req.param.id);
    var query = { IdPedido: req.params.id }; 
    await Order.findOneAndDelete(query);
    res.json({mensaje: "Orden eliminada"})
});

router.put('/confirmar/:id', async (req, res) => {
    const id = req.params.id;
    var query = { IdPedido: id};
    const parametros = { estado: 'Procesado', fechaEntrega: Date.now() };
    await Order.findOneAndUpdate(query, parametros);
    const orden =  await Order.findOne(query);
    const libros =  orden.libros;
    for (var i = 0; i < libros.length; i++){
        const libro =  await Book.findOne({issn: libros[i]});
        await Book.findOneAndUpdate({issn: libros[i]}, {cantidadVendida: libro.cantidadVendida + 1, cantidadDisponible: libro.cantidadDisponible - 1})
    }
    res.json({mensaje: "Orden procesada"});
});

router.put('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    var query = { IdPedido: parametros.id }; 
    await Order.findOneAndUpdate(query, parametros);
    res.json({mensaje: "Orden actualizado"});
});

module.exports = router;