const express = require('express');
const router = express.Router();

const controller = require('../controllers/discountController');

router.get('/', controller.applyDiscount)

module.exports = router;