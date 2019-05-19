const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const {user, password} = parametros;
    console.log(user,password);
    
    try{
        const usuario = await User.findOne({nombreUsuario: user, password: password});

        res.json({
            id: usuario._id,
            tipoUsuario: usuario.tipoUsuario
        }
        );
    }catch(error){
        res.json({error :"error"});
    }
    
    
    
});

module.exports = router;