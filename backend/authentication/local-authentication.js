const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user.model');

passport.serializeUser((user, done) => {
    done(null, user.id);
}); 

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
}); 

passport.use('local-signup', new localStrategy({
    usernameField: 'nombreUsuario',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, nombreUsuario, password, done) => {
    const user = new User();
    user.nombre = req.body.nombre;
    user.primerApellido = req.body.primerApellido;
    user.segundoApellido = req.body.segundoApellido;
    user.cedule = req.body.cedula;
    user.fechaNacimiento = req.body.fechaNacimiento;
    user.tipoUsuario = req.body.tipoUsuario;
    user.ubicacion = req.body.ubicacion;
    user.correoElectronico = req.body.correoElectronico;
    user.nombreUsuario = nombreUsuario;
    user.password = user.encryptPassword(password);
    user.telefonos = req.body.telefonos;
    await user.save();
    console.log('SAVE');
    done(null, user);

        
}))