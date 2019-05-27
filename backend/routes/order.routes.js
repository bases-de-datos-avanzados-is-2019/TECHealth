const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const User = require('../models/user.model');
const Book = require('../models/book.model');

router.get('/filtros/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const {IdCliente, estado, fechaMin, fechaMax, filtros} = parametros;
    if(filtros.length === 0){//No hay filtros y se devuelven por fecha de realizacion
        const orders = await Order.find().sort('-fechaRealizacion');
        res.json(orders);
        return 
    }else{
        var consultaFiltro = {
            $and: []
        }
        for(var i = 0; i<filtros.length; i++){
            if(filtros[i] === 'IdCliente'){
                consultaFiltro.$and.push({IdCliente: IdCliente});
                continue
            }
            if(filtros[i] === 'estado'){
                consultaFiltro.$and.push({estado: estado});
                continue
            }
            if(filtros[i] === 'fechas'){
                const valorMin = {$gte: fechaMin};
                const valorMax = {$lte: fechaMax};
                consultaFiltro.$and.push({fechaRealizacion: valorMin});
                consultaFiltro.$and.push({fechaRealizacion: valorMax});
                continue
            }
        }
        const orders = await Order.find(consultaFiltro).sort('-fechaRealizacion');;
        res.json({cantidadResultados: orders.length, resultados: orders});
        return
    }
});

router.get('/filtroTemas/:tema', async(req,res) => {
    var orders = await Order.find({});
    const largo = orders.length;
    var result = { tema: req.params.tema, resultado: []};
    for (var i = 0; i < largo; i++){
        var librosOrden = orders[i].libros;
        var largoLibros = librosOrden.length;
        for (var j = 0; j < largoLibros; j++){
            const libro = await Book.findOne({issn: librosOrden[j]});
            if (libro.tema === req.params.tema){
                result.resultado.push(orders[i]);
                break;
            }
        };
    };
    res.json(result);
    return;
});

router.get('/rangos', async(req,res) => {
    var clientes = await User.find({tipoUsuario: 'cliente'}, {'_id':1, 'nombreUsuario': 1});
    const largo = clientes.length;
    var result = { resultado: []};
    for (var i = 0; i < largo; i++){
        var query = {IdCliente: clientes[i]._id};
        var ordenes = await Order.find(query);
        if (ordenes[0] === undefined){
            var temp = {_id: clientes[i]._id, nombreUsuario: clientes[i].nombreUsuario, maxPedidos: 0, minPedidos: 0};
            result.resultado.push(temp);
            continue;
        }
        var largoOrdenes = ordenes.length;
        var numLibros = [];
        for (var j = 0; j < largoOrdenes; j++){
            numLibros.push(ordenes[j].libros.length);
        };
        
        var temp = {_id: clientes[i]._id, nombreUsuario: clientes[i].nombreUsuario, maxPedidos: Math.max.apply(Math, numLibros), minPedidos: Math.min.apply(Math, numLibros)};
        result.resultado.push(temp);
        
    };
    res.json(result);
    return;
});

router.get('/tresClientes', async(req,res) => {
    var clientes = await Order.find().distinct('IdCliente');
    const largo = clientes.length;
    console.log(largo);
    var result = { resultado: []};
    for (var i = 0; i < largo; i++){
        var query = {IdCliente: clientes[i]};
        var ordenes = await Order.find(query);
        var largoOrdenes = ordenes.length;
        var temp = {_id: clientes[i], pedidos: largoOrdenes};
        result.resultado.push(temp);
    };

    result.resultado.sort((a, b) => {return b.pedidos-a.pedidos});
    result.resultado.splice(3);
    res.json(result);
    return;
});

router.get('/IdCliente/:json', async(req,res) => {
    const parametros = JSON.parse(req.params.json);
    const {IdCliente, estado, fechaMin, fechaMax, filtros} = parametros;
    const query = {IdCliente: IdCliente}
    if(filtros.length === 0){//No hay filtros y se devuelven por fecha de realizacion
        const orders = await Order.find(query).sort('-fechaRealizacion');
        res.json(orders);
        return 
    }else{
        var consultaFiltro = {
            $and: []
        }
        consultaFiltro.$and.push(query);
        for(var i = 0; i<filtros.length; i++){
            if(filtros[i] === 'estado'){
                consultaFiltro.$and.push({estado: estado});
                continue
            }
            if(filtros[i] === 'fechas'){
                const valorMin = {$gte: fechaMin};
                const valorMax = {$lte: fechaMax};
                consultaFiltro.$and.push({fechaRealizacion: valorMin});
                consultaFiltro.$and.push({fechaRealizacion: valorMax});
                continue
            }
        }
        const orders = await Order.find(consultaFiltro).sort('-fechaRealizacion');;
        res.json({cantidadResultados: orders.length, resultados: orders});
        return
    }
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