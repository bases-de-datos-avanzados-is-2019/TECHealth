const mongoose = require('mongoose');//Mongoose permite conectarse a mongodb y modelar datos

const MONGODB_URI = 'mongodb://localhost/LibraryTecDB';//Coneccion a nivel local con la BD TECHealthBD 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(db => console.log('DataBase connected'))
   .catch(err => console.error(err));
module.exports = mongoose;