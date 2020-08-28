const db = require('./models');
const data = require('./carData.json');

console.log(data);

db.Car.deleteMany({}, (err, deletedCars) => {
    db.Car.create(data.cars, (err, seededCars) => {
        if (err) console.log(err);

        console.log(data.cars.length, 'cars created sucessfuly');

        process.exit();
    });
});