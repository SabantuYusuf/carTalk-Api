// imports
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
require('dotenv').config();
//doteven

const PORT = process.env.PORT || 4001;
const app = express();



// middleware - JSON parsing
// Parse JSON datta out, turn it back into an object and attach it to request object as body
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// middleware - cors
app.use(cors())

// middleware - API routes
app.use('/api/v1/carTalk', routes.cars);





// connection 
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));