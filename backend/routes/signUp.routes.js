const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/:json', (req, res) => {
    passport.authenticate('local-signup',{
        passReqToCallback: true   
    })
    res.json({memsaje :'aceptado'})
});

router.get('/usuarioAceptado', (req, res) => {
    res.json({mensaje: 'Aceptado'});
});

router.get('/usuarioRechazado', (req,res) => {
    res.json({mensaje: 'Error al insertar usuario'});
});

module.exports = router;
