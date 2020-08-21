const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    name: String,
    year: String,
    model: String,
    horsepower: String,
});

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;