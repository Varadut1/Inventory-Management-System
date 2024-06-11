const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const { protect, restrictTo } = require('../controllers/customerController');

router.use(protect);
router.post('/', restrictTo('admin'), discountController.createDiscount);
router.post('/apply', discountController.applyDiscount);

module.exports = router;