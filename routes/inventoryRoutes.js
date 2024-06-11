const express = require('express');
const router = express.Router();

const controller = require('../controllers/inventoryController');

router.post('/', controller.addItem);
router.delete('/', controller.removeItem);

module.exports = router;