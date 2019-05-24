const express = require('express');
const router = express.Router();//Para poder crear las rutas de los recursos
//El metodo res.send({Object}) es la respuesta que se le envia al navegador
const Theme = require('../models/theme.model');
router.get('/', async (req, res) => {
    const Themes = await Theme.find();
    res.json(Themes);
});

router.post('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const { nombre } = parametros;
    const newTheme = new Theme({nombre});
    await newTheme.save();
    res.json({mensaje: 'Tematica guardada'});
})

router.delete('/:codigo', async (req, res) => {
    var query = { codigo: req.params.codigo }; 
    await Theme.findOneAndDelete(query);
    res.json({mensaje: "Tematica eliminada"});
})

router.put('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    var query = { nombre: parametros.nombre }; 
    await Theme.findOneAndUpdate(query, parametros);
    res.json({mensaje: "Tematica actualizado"});
});

module.exports = router;