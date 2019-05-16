const express = require('express');
const router = express.Router();//Para poder crear las rutas de los recursos
const Book = require('../models/book.model');
//El metodo .send('respuesta') es la respuesta que se le envia al navegador
router.get('/:json', async (req, res) => {
    const books = await Book.find();
    //res.json(books);
    console.log(req.params.json);
    var parametros = JSON.parse(req.params.json);
    console.log('user:', parametros.user);
    console.log('password', parametros.password);
    res.json({id: 'hola desde el servidor', tipo: 'tipo1'});
});

router.post('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const { issn, nombre, tema, descripcion, libreria,
        cantidadVendida, cantidadDisponible, foto, precioDolares} = parametros;
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
