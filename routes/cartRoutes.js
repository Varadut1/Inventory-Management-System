const express = require('express');
const router = express.Router();
const { protect } = require('../controllers/customerController');
const controller = require('../controllers/cartController');

router.use(protect)
router.get('/', controller.getItems);
router.post('/', controller.addItem);

module.exports = router;