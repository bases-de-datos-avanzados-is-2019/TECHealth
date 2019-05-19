const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', async (req, res) => {
    try{
        const usuarios = await User.find();

        res.json(usuarios);
    }catch(error){
        res.json({error :"error"});
    }
});

router.post('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const { nombre, primerApellido,  segundoApellido, cedula, fechaNacimiento,
    tipoUsuario, ubicacion, correoElectronico, nombreUsuario, password, telefonos} = parametros;
    const newUser = new User({nombre, primerApellido, segundoApellido, cedula, fechaNacimiento, 
    tipoUsuario, ubicacion, correoElectronico,  nombreUsuario, password, telefonos});
    try{
        await newUser.save();
        res.json({mensaje: 'aceptado'});   
    }catch(error){
        res.json({mensaje: error});
    }
    
    
});

router.delete('/:id', async (req, res)=> {
    try{
        await User.findByIdAndDelete(req.param.id);
        res.json({mensaje: "usuario eliminado"})  
    }catch(error){
        res.json({mensaje: error});
    }  
});

router.put('/', (req, res) => {
    res.json({
        response: 'PUT Usuario'
    });//Provisional
});

module.exports = router;
