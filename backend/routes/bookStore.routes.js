const express = require('express');
const router = express.Router();//Para poder crear las rutas de los recursos
//El metodo res.send({Object}) es la respuesta que se le envia al navegador
router.get('/', (req, res) => {
    res.json({
        response: 'GET Librerias'
    });//Provisional
});

router.post('/', (req, res) => {
    res.json({
        response: 'POST Librerias'
    });//Provisional
})

router.delete('/', (req, res) => {
    res.json({
        response: 'DELETE Librerias'
    });//Provisional
})

router.put('/', (req, res) => {
    res.json({
        response: 'PUT Librerias'
    });//Provisional
});

module.exports = router;