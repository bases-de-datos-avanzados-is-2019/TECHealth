const express = require('express');
const router = express.Router();//Para poder crear las rutas de los recursos
const Book = require('../models/book.model');
const Theme = require('../models/theme.model');
//El metodo .send('respuesta') es la respuesta que se le envia al navegador
router.get('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const {nombre, libreria, tema, precioMin, precioMax, filtros} = parametros;
    if(filtros.length === 0){//No hay filtros y se devuelven todos los libros
        const books = await Book.find();
        res.json({resultado: books});
        return 
    }else{
        var consultaFiltro = {
            $and: []
        }
        for(var i = 0; i<filtros.length; i++){
            if(filtros[i] === 'nombre'){
                consultaFiltro.$and.push({nombre: nombre});
                continue
            }
            if(filtros[i] === 'libreria'){
                consultaFiltro.$and.push({libreria: libreria});
                continue
            }
            if(filtros[i] === 'tema'){
                consultaFiltro.$and.push({tema: tema});
                continue
            }
            if(filtros[i] === 'precios'){
                const valorMin = {$gte: precioMin};
                const valorMax = {$lte: precioMax};
                consultaFiltro.$and.push({precioDolares: valorMin});
                consultaFiltro.$and.push({precioDolares: valorMax});
                continue
            }
            if(filtros[i] === 'issn'){
                consultaFiltro.$and.push({issn : precioMin})//precionMin tambien contiene el valor issn del libro
                continue
            }
        }
        const books = await Book.find(consultaFiltro);
        res.json({resultado: books});
        return
    }
});

router.post('/:json', async (req, res) => {
    //var issn = await Book.countDocuments({});
    //issn = issn + 1;
    const books = await Book.find();
    const issn = books[books.length - 1].issn + 1;
    const parametros = JSON.parse(req.params.json);
    const {nombre, tema, descripcion, libreria,
        cantidadVendida, cantidadDisponible, foto, precioDolares} = parametros;
    const tempBook = await Book.findOne({$and: [{nombre: nombre}, {libreria: libreria}]});//Busca unlibro que ya tenga ese titulo en la misma libreria
    if(tempBook){//si el libro existe se envia mensaje de error
        res.json({mensje:'El libro ya se encuentra en la libreria seleccionada'});
        return
    }else{//si el libro no existe se agrega a la base de datos
        const newBook = new Book({issn, nombre, tema, descripcion, libreria, cantidadVendida,
            cantidadDisponible, foto, precioDolares });
        try {
            await newBook.save();
            res.json({mensaje: 'Libro guardado'});
            return
        } catch (error) {
            res.json({mensaje: 'Error al guardar libro'});
            return
        }
      
    }
   
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
