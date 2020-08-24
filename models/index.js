const mongoose = require('mongoose');

console.log('MONGO DB=', process.env.MONGODB_URI);

const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/cars";
const configOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

mongoose.connect(connectionString, configOptions)
    .then(() => console.log('MongoDB successfully connected...'))
    .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = {
    Car: require('./Car'),
};