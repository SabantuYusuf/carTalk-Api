// imports
const router = require('express').Router();
const ctrl = require('../controllers');
//requre auth here


// routes
router.get('/', ctrl.cars.index);
router.get('/:id', ctrl.cars.show);

router.post('/', ctrl.cars.create);
router.put('/:id', ctrl.cars.update);
router.delete('/:id', ctrl.cars.destroy);
//auth here

// exports
module.exports = router;