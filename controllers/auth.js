const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();
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
        const foundUser = await db.User.findOne({ email: req.body.email });

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
        await db.User.create({ ...req.body, password: hash });

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
// LOGIN CONROLLER
const login = async (req, res) => {
    console.log(req.body);
    try {
        // FIND USER BY EMAIL ( OR USERNAME)
        const foundUser = await db.User.findOne({ email: req.body.email });
        // const foundUser = await db.User.findOne({ username: req.body.username });

        if (!foundUser) {
            return res.status(400).json({
                status: 400,
                message: "username or password is incorrect"
            });
        }

        // CHECK IF PASSWORD MATCH
        const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                message: "Username or password is incorrect",
            });
        }

        // CREATE TOKEN PAYLOAD
        const payload = {id: foundUser._id};
        const secret = process.env.JWT_SECRET;
        // const expriration = {expriresIn: "1h"}

        // SEND TOKEN
        const token = await jwt.sign(payload, secret);

        // SEND SUCCESS WITH TOKEN
        res.status(200).json({token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again",
        });
    }
};

// REGISTER CONTROLLER
const verify = async (req, res) => {
    // GET TOKEN FROM REQUEST HEADER
    const token = req.headers['authorization'];
    console.log(req.headers)
    console.log('Verify Token -->', token);

    // VERIFY TOKEN
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err || !decodedUser) {
            return res.status(401).json({
                message: "You are not authorized. Please login and try again"
            });
        }

        // ADD PAYLOAD TO REQ OBJECT
        req.currentUser = decodedUser;

        // SEND SUCCESS WITH TOKEN AS A VERIFY ROUTE
        res.status(200).json({user: decodedUser});

        // CALL NEXT AS MIDDLEWARE FUNCTION
        // next();
    })
};


module.exports = {
    register,
    login,
    verify,
};


