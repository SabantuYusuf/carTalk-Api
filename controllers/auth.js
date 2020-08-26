const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const db = require('../models');
// Auth here

// REGISTER CONTROLLER
const register = async (req, res) => {
    // VALIDATE FIELD INPUT
    if (!req.body.username ||!req.body.firstName|| !req.body.lastName|| !req.body.email || !req.body.password) {
        return res.status(400).json({message: 'All fields are require. Please try again'});
    }

    // VALIDATE PASSWORD LENGTH
    if(req.body.password.length < 3) {
        return res.status(400).json({message: 'Password must be at least 3 characters long'});
    }

    try {
        // CHECK IF EMAIL ALREADY REGISTERED
        const foundUser = await db.User.findOne({ email: req.body.email});

        // SEND ERROR IF FOUND USER
        if (foundUser) {
            res.status(400).json({
                status: 400,
                message: "Email address has already been registerd. Please ty again"
            });
        }

        // CREATE SALT FOR HASH
        const salt = await bcrypt.genSalt(10);
        //HASH USER PASSWORD
        const hash = await bcrypt.hash(req.body.password, salt);
        // CREATE USER WITH HASHED PASSWORD
        await db.User.create({ ...req.body, password: hash});

        // SEND SUCCESS
        return res.status(200).json({status: 200, message: "success"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again",
        });
    }
};

module.exports = {
    register,
};


