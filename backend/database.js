const mongoose = require('mongoose');//Mongoose permite conectarse a mongodb y modelar datos

const MONGODB_URI = 'mongodb://localhost/TECHealthDB';//Coneccion a nivel local con la BD TECHealthBD 

//Por ahora no se hara la coneccion con la base de datos
//mongoose.connect(MONGODB_URI)
//    .then(db => console.log('DataBase connected'))
//    .catch(err => console.error(err));
module.exports = mongoose;