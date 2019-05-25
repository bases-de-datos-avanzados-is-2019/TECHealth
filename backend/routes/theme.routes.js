const express = require('express');
const router = express.Router();//Para poder crear las rutas de los recursos
//El metodo res.send({Object}) es la respuesta que se le envia al navegador
const Theme = require('../models/theme.model');
router.get('/', async (req, res) => {
    const Themes = await Theme.find();
    res.json(Themes);
});

router.get('/tema', async (req, res) => {
    /*var temas = await Theme.find();
    console.log(temas);
    const largo = temas.length;
    var result = { resultado: []};
    for (var i = 0; i < largo; i++){
        var query = {tema: temas[i]};
        var libros = await Book.find(query);
        var largolibros = libros.length;
        var vendidosTotales = 0;
        var montoTotal = 0;
        for (var j = 0; j < largolibros; j++){
            vendidosTotales += libros[j].cantidadVendida;
            montoTotal += libros[j].precioDolares;
        };
        var temp = {tema: temas[i], cantidadVendida: vendidosTotales, montoPromedio: montoTotal/largolibros};
        result.resultado.push(temp);
    };*/
    res.json({mensaje: "result"});
    return;
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