const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');

router.post('/', controller.signup);
router.get('/', controller.protect)

module.exports = router;