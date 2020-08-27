const jwt = require('jsonwebtoken');

const authRequired = (req, res, next) => {
    // GET TOKEN FROM REQUEST HEADER
    const token = req.headers['authorization'];
    console.log(req.headers);
    console.log('Verify Token --->', token);

    // VERIGY TOKEN
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err || !decodedUser) {
            return res.status(401).json({
                message: 'You are not authorized. Please login and try again'
            });
        }

        // ADD PALOAD TO REQ OBJECT
        req.currentUser=decodedUser;
        
        // ***** ----- ------ ******
        // CAL NEXT AS MIDEWARE FUNCTION
        next();
    });
};

module.exports = authRequired;