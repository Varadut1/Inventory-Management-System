const express = require('express');
const router = express.Router();

const controller = require('../controllers/inventoryController');

router.get('/', controller.getItem)
router.post('/', controller.addItem);
router.delete('/', controller.removeItem);

module.exports = router;