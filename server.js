// imports
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//doteven

const routes = require('./routes');
const PORT = process.env.PORT || 4001;
const app = express();



// middleware - cors : cross origin Resourse Sharing
app.use(cors({
    origin: [`http://localhost:3000`],
    method: "GET, POST, PUT DELETE",
    // credentials: true, // allows the session cookie to be sent back and forth from server to client
    optionsSuccessStatus: 200 
}));


// middleware - JSON parsing
// Parse JSON datta out, turn it back into an object and attach it to request object as body
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// middleware - API routes
app.use('/api/v1/carTalk', routes.cars);

// Auth routes
app.use('/api/v1/auth', routes.auth);



// connection 
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));