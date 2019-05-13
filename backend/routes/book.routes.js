const express = require('express');
const router = express.Router();//Para poder crear las rutas de los recursos
const Book = require('../models/book.model');
//El metodo .send('respuesta') es la respuesta que se le envia al navegador
router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

router.post('/', async (req, res) => {
    const { issn, nombre, tema, descripcion, libreria,
    cantidadVendida, cantidadDisponible, foto, precioDolares} = req.body;
    const newBook = new Book({issn, nombre, tema, descripcion, libreria, cantidadVendida,
    cantidadDisponible, foto, precioDolares });
    await newBook.save();
    res.json({mensaje: 'Libro guardado'});
});

router.delete('/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({mensaje: "Libro eliminado"});
})

router.put('/', (req, res) => {
    res.json({
        response: 'PUT Libros'
    });//Provisional
});

module.exports = router;