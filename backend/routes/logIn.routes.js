const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const {user, password} = parametros;
      
    const usuario = await User.findOne({nombreUsuario: user});
    if(usuario === null){
        res.json({id:-1, tipoUsuario:'Usuario no encontrado'});
        return
    }
    if(usuario.comparePassword(password) === false){
        res.json({id: -1, tipoUsuario:'Contraseña incorrecta'});
        return
    }
        res.json({
            id: usuario._id,
            tipoUsuario: usuario.tipoUsuario
        }
        );    
});

router.post('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const {user, password} = parametros;
      
    const usuario = await User.findOne({nombreUsuario: user});
    if(usuario === null){
        res.json({id:-1, tipoUsuario:'Usuario no encontrado'});
        return
    }
    if(usuario.comparePassword(password) === false){
        res.json({id: -1, tipoUsuario:'Contraseña incorrecta'});
        return
    }
        res.json({
            id: usuario._id,
            tipoUsuario: usuario.tipoUsuario
        }
        );    
});

module.exports = router;