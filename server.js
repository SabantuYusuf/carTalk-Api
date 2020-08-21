// imports
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
//doteven

const routes = require('./routes');
const port = process.env.PORT;
const app = express();

// CORS - Cross Origin Resource Sharing:


// middleware - JSON parsing


// middleware - API routes
// Car Routes


// connection 
app.listen(port, () => console.log(`Server is running on port ${port}`));