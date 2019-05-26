const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

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
    if(usuario.tipoUsuario === "gerente"){
        res.json({
            id: usuario._id,
            tipoUsuario: usuario.tipoUsuario,
            libreria: usuario.libreria
        }
        );
        return
    }else{
        res.json({
            id: usuario._id,
            tipoUsuario: usuario.tipoUsuario
        }
        );
        return
    }
            
});

module.exports = router;