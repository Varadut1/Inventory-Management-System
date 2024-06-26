const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');

router.post('/', controller.signup);
router.post('/login', controller.signIn);
router.get('/', controller.getCustomer);
router.post('/admin', controller.addAdmin)

module.exports = router;