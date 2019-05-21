const express = require('express');
const router = express.Router();//Para poder crear las rutas de los recursos
//El metodo .send('respuesta') es la respuesta que se le envia al navegador
const Offer = require('../models/offer.model');
router.get('/', async (req, res) => {
    const offers = await Offer.find();
    res.json(offers);
});

router.post('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const { nombre, descripcion, fechaInicio, fechaFinalizacion, porcentajeDescuento} = parametros;
    const newOffer = new Offer({ nombre, descripcion, fechaInicio, fechaFinalizacion, porcentajeDescuento});
    await newOffer.save();
    res.json({mensaje: 'Oferta guardada'});
})

router.delete('/:nombre', async (req, res) => {
    var query = { nombre: req.params.nombre }; 
    await Book.findOneAndDelete(query);
    res.json({mensaje: "Oferta eliminada"});
})

router.put('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    var query = { nombre: parametros.nombre }; 
    await Book.findOneAndUpdate(query, parametros);
    res.json({mensaje: "Oferta actualizado"});
});

module.exports = router;