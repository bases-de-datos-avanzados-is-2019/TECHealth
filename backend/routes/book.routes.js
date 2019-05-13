const express = require('express');
const router = express.Router();//Para poder crear las rutas de los recursos
const Book = require('../models/book.model');
//El metodo .send('respuesta') es la respuesta que se le envia al navegador
router.get('/:json', async (req, res) => {
    const books = await Book.find();
    //res.json(books);
    res.json({mensaje: req.params.json});
    const {user, password} = req.params.json;
    console.log('user:',user);
    console.log('password', password);
});

router.post('/:json', async (req, res) => {
    const { issn, nombre, tema, descripcion, libreria,
    cantidadVendida, cantidadDisponible, foto, precioDolares} = req.body;
    const newBook = new Book({issn, nombre, tema, descripcion, libreria, cantidadVendida,
    cantidadDisponible, foto, precioDolares });
    await newBook.save();
    res.json({mensaje: req.params.json});
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