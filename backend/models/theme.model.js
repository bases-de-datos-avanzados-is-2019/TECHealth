const mongoose = require('mongoose');
const { Schema } = mongoose;

const ThemeSchema = new Schema({
    nombre: {type: String, required: true}
});

module.exports = mongoose.model('Themes',ThemeSchema);