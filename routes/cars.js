// imports
const router = require('express').Router();
const ctrl = require('../controllers');
//requre auth here
const authRequired = require('../middleware/authRequired');


// routes
router.get('/', ctrl.cars.index);
router.get('/:id', ctrl.cars.show);

router.post('/', authRequired, ctrl.cars.create);
router.put('/:id', authRequired, ctrl.cars.update);
router.delete('/:id', authRequired, ctrl.cars.destroy);


// exports
module.exports = router;