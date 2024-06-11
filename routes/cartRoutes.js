const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');

router.post('/', controller.addItem);

module.exports = router;