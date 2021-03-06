const express = require('express');
const router = express.Router();//Para poder crear las rutas de los recursos
//El metodo res.send({Object}) es la respuesta que se le envia al navegador
const BookStore = require('../models/bookStore.model');
router.get('/', async (req, res) => {
    const bookStores = await BookStore.find();
    res.json({resultado: bookStores});
});

router.post('/:json', async (req, res) => {
    const bookStores = await BookStore.find();
    const codigo = bookStores[bookStores.length - 1].codigo + 1;
    const parametros = JSON.parse(req.params.json);
    const { nombre, pais, detalleUbicacion, telefono, horario } = parametros;
    const newBookStore = new BookStore({codigo, nombre, pais, detalleUbicacion, telefono, horario});
    await newBookStore.save();
    res.json({mensaje: 'Libreria guardada'});
})

router.delete('/:codigo', async (req, res) => {
    var query = { codigo: req.params.codigo }; 
    await BookStore.findOneAndDelete(query);
    res.json({mensaje: "Libreria eliminada"});
})

router.put('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    var query = { codigo: parametros.codigo }; 
    await BookStore.findOneAndUpdate(query, parametros);
    res.json({mensaje: "Libreria actualizado"});
});

module.exports = router;