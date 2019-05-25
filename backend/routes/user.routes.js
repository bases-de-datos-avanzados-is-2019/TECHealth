const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const {id} = parametros;
    if(id === "todos"){
        const usuarios = await User.find();

        res.json(usuarios);
    }else{
        const usuario = await User.findOne({_id:id});
        res.json(usuario);
    }
    
});

router.post('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    console.log(parametros);
    const { nombre, primerApellido,  segundoApellido, cedula, fechaNacimiento,
    tipoUsuario, ubicacion, correoElectronico, nombreUsuario, password, telefonos} = parametros;
    const tempUser = await User.findOne({nombreUsuario: nombreUsuario});
    const tempcorreoElectronico = await User.findOne({correoElectronico: correoElectronico});
    if(tempUser !== null){
        res.json({mensaje: 'Nombre de usuario no disponible'});
        return
    }
    if(tempcorreoElectronico !== null){
        res.json({mensaje: 'Correo electronico ya registrado por otro usuario'});
        return 
    }
    const user = new User();
    user.nombre = nombre;
    user.primerApellido = primerApellido;
    user.segundoApellido = segundoApellido;
    user.cedula = cedula;
    user.fechaNacimiento = fechaNacimiento;
    user.tipoUsuario = tipoUsuario;
    user.ubicacion = ubicacion;
    user.correoElectronico = correoElectronico;
    user.nombreUsuario = nombreUsuario;
    user.password = user.encryptPassword(password);
    user.telefonos = telefonos;
    try{
        await user.save();
        res.json({mensaje: 'aceptado'});   
    }catch(error){
        res.json({mensaje: 'error'});
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

router.put('/:json', async (req, res) => {
    const parametros = JSON.parse(req.params.json);
    const nombreUsuario = parametros.nombreUsuario;
    const query = {nombreUsuario: nombreUsuario};
    await User.findOneAndUpdate(query, parametros);
    res.json({mensaje: 'Aceptado'});
});

module.exports = router;
