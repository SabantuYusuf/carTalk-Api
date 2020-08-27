const router = require('express').Router();
const ctrl = require('../controllers');

// Auth here
router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.get('verify', ctrl.auth.verify);

module.exports = router;