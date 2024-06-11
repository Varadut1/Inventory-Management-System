const express = require('express');
const router = express.Router();
const { protect } = require('../controllers/customerController');
const controller = require('../controllers/inventoryController');

router.get('/', controller.getItem)
router.post('/', controller.addItem);
router.use(protect)
router.delete('/', controller.removeItem);

module.exports = router;