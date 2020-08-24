// imports
const express = require('express');
const routes = require('./routes');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
//doteven

const router = require('./routes/Cars');
const PORT = process.env.PORT || 4000;
const app = express();



// middleware - JSON parsing

app.use(express.json());


// middleware - cors
app.use(cors())

// middleware - API routes
app.use('/api/v1/carTalk', router.cars);





// connection 
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));