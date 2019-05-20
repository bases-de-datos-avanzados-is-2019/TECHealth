if(process.env.NODE_ENV==='development'){
    require('dotenv').config();
}
//Este archivo index.js es el que lee por defecto el backend
const express = require('express');//El modulo express ayuda a escribir codigode servidor
const morgan = require('morgan');//Permite visualizar mensajes en consola sobre la interaccion entre navegador y server
const app = express();//app es el servidor
const passport = require('passport');
const session = require('express-session');

require('./authentication/local-authentication');
require('./database');


//Configuraciones del servidor
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));//Muestra los mensajes de interaccion para el modo de desarrollo
app.use(express.json());//Permite entender el codigo proveniente del navegador en formato json
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Rutas de acceso a los recursos
app.use('/api/bookStore',require('./routes/bookStore.routes'));
app.use('/api/book',require('./routes/book.routes'));
app.use('/api/offer',require('./routes/offer.routes'));
app.use('/api/user',require('./routes/user.routes'));
app.use('/api/order',require('./routes/order.routes'));
app.use('/',require('./routes/default.routes'));
app.use('/api/logIn', require('./routes/logIn.routes'));
app.use('/api/signUp', require('./routes/signUp.routes'));

//Inicializacion del servidor
app.listen(app.get('port'), () => {
    console.log('Server on port:',app.get('port'));
});