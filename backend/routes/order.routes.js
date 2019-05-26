const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

router.get('/', async(req,res) => {
    const orders = await Order.find().sort('-fechaRealizacion');
    res.json(orders);
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
    res.json({mensaje: "Orden procesada"});
});

module.exports = router;