// const express = require('express');
const db = require('../models');
// const { User } = require('../models');

// const router = express.Router();

// All car
const index = (req, res) => {
    db.Car.find({}, (err, foundCars) => {
        if (err) console.log('Error in cars index:', err);

        res.json({cars:foundCars})
        // if(!foundCars) return res.json({
        //     message: 'No Cars found in db'
        // })
        // res.status(200).json({ cars: foundCars});
    });
};

// Car show
const show = (req, res) => {
    db.Car.findById(req.params.id, (err, foundCar) => {
        if (err) console.log('Error in cars show:', err);

        res.status(200).send(foundCar);
    });
};

// New Car
const create = (req, res) => {
    db.Car.create(req.body, (err, savedCar) => {
        if (err) console.log('Error in cars create:', err);

        res.status(200).json(savedCar);
    });
};


// Edit Car
const update = (req, res) => {
    db.Car.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCar) => {
        if (err) console.log('Error in cars update:', err);

        if (!updatedCar) {
            res.status(400).json({message: `Could not find car with id ${req.params.id}`});
        }

        res.json(updatedCar);
    });
};


// Delete Car
const destroy = (req, res) => {
    db.Car.findByIdAndDelete(req.params.id, (err, deleteCar) => {
        if (err) console.log('Error in cars destroy:', err);

        res.status(200).json(deleteCar);
    });
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};

