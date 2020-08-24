// const express = require('express');
const db = require('../models');
// const { User } = require('../models');

// const router = express.Router();

const index = (req, res) => {
    db.Car.find({}, (err, foundCars) => {
        if (err) console.log('Error in cars index:', err);

        res.json({cars: foundCars})
        // if(!foundCars) return res.json({
        //     message: 'No Cars found in db'
        // })
        // res.status(200).json({ cars: foundCars});
    });
};


const show = (req, res) => {
    db.Car.findById(req.params.id, (err, foundCar) => {
        if (err) console.log('Error in cars show:', err);

        res.status(200).send(foundCar);
    });
};

const create = (req, res) => {
    db.Car.create(req.body, (err, savedCar) => {
        if (err) console.log('Error in cars create:', err);

        res.status(200).json(savedCar);
    });
};


const update = (req, res) => {
    db.Car.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCar) => {
        if (err) console.log('Error in cars update:', err);

        res.json(updatedCar);
    });
};

const destroy = (req, res) => {
    db.Car.findByIdAndDelete(req.params.id, (err, deletedCar) => {
        if (err) console.log('Error in cars destroy:', err);

        res.status(200).json(deletedCar);
    });
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};

