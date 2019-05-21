const express = require('express');
const router = express.Router();//Para poder crear las rutas de los recursos
const Book = require('../models/book.model');
//El metodo .send('respuesta') es la respuesta que se le envia al navegador
router.get('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const {nombre, libreria, tema, precioMin, precioMax, filtros} = parametros;
    if(filtros.length === 0){//No hay filtros y se devuelven todos los libros
        const books = await Book.find();
        res.json({resultado: books});
        return 
    }else{
        var consultaFiltro = new Object();
        for(var i = 0; i<filtros.length; i++){
            if(filtros[i] === 'nombre'){
                consultaFiltro.nombre = nombre;
                continue
            }
            if(filtros[i] === 'libreria'){
                consultaFiltro.libreria = libreria;
                continue
            }
            if(filtros[i] === 'tema'){
                consultaFiltro.tema = tema;
                continue
            }
            if(filtros[i] === 'precioMin'){
                consultaFiltro.precioMin = precioMin;
                continue
            }
            if(filtros[i] === 'precioMax'){
                consultaFiltro.precioMax = precioMax;
                continue
            }
        }
        const books = await Book.find(consultaFiltro);
        res.json({resultado: books});
        return
    }
});

router.post('/:json', async (req, res) => {
    var issn = await Book.countDocuments({});
    issn = issn + 1;
    const parametros = JSON.parse(req.params.json);
    const {nombre, tema, descripcion, libreria,
        cantidadVendida, cantidadDisponible, foto, precioDolares} = parametros;
    const newBook = new Book({issn, nombre, tema, descripcion, libreria, cantidadVendida,
    cantidadDisponible, foto, precioDolares });
    await newBook.save();
    res.json({mensaje: 'Libro guardado'});
});

router.delete('/:issn', async (req, res) => {
    var query = { issn: req.params.issn }; 
    await Book.findOneAndDelete(query);
    res.json({mensaje: "Libro eliminado"});
})

router.put('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const id = parametros.issn;
    var query = { issn: id}; 
    await Book.findOneAndUpdate(query, parametros);
    res.json({mensaje: "Libro actualizado"});
});

module.exports = router;
