const mongoose = require('mongoose');//Mongoose permite conectarse a mongodb y modelar datos

//Coneccion a nivel local con la BD 

try {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true } )
    console.log('Data Base connected');
} catch (error) {
    console.error(error);
}
module.exports = mongoose;