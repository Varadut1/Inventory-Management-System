const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/customerController');
const controller = require('../controllers/inventoryController');

router.use(protect)
router.get('/', controller.getItem);
router.post('/', controller.addItem);
router.delete('/:productId', restrictTo('admin'), controller.removeItem);

module.exports = router;