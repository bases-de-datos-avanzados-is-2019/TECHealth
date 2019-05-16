const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const { nombre, primerApellido,  segundoApellido, cedula, fecha,
    tipoCliente, ubicacion, correo, nombreUsuario, contra, telefonos} = parametros;
    const newUser = new User({nombre, primerApellido, segundoApellido, cedula, fecha, 
    tipoCliente, ubicacion, correo,  nombreUsuario, contra, telefonos});
    console.log(nombre);
    //await newUser.save();
    res.json(nombre);
});

router.delete('/:id', async (req, res)=> {
    await User.findByIdAndDelete(req.param.id);
    res.json({mensaje: "usuario eliminado"})
});

router.put('/', (req, res) => {
    res.json({
        response: 'PUT Usuario'
    });//Provisional
});

module.exports = router;
