const express = require('express');
const router = express.Router();//Para poder crear las rutas de los recursos
//El metodo .send('respuesta') es la respuesta que se le envia al navegador
router.get('/', (req, res) => {
    res.json({
        response: 'GET Libros'
    });//Provisional
});

router.post('/', (req, res) => {
    res.json({
        response: 'POST Libros'
    });//Provisional
})

router.delete('/', (req, res) => {
    res.json({
        response: 'DELETE Libros'
    });//Provisional
})

router.put('/', (req, res) => {
    res.json({
        response: 'PUT Libros'
    });//Provisional
});

module.exports = router;