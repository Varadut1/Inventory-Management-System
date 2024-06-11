const Inventory = require('../models/Inventory');

exports.addItem = async(req, res) => {
    const { productId, name, quantity, type } = req.body;
    await Inventory.addItem(productId, name, quantity, type);
    const data = {productId, quantity, name, type}
    res.status(200).json({
        status: 'success',
        data
    });
};

exports.removeItem = async(req, res) => {
    const { productId, quantity } = req.body;
    const data = await Inventory.removeItem(productId, quantity);
    res.status(200).json({
        status: 'success',
        message: 'Items removed',
        remainig: data
    });
};
