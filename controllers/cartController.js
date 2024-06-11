const Inventory = require('../models/Inventory');
const Cart = require('../models/Cart');

exports.addItem = async(req, res) => {
    const { customerId, productId, quantity } = req.body;
    if (Inventory.getQuantity(productId) >= quantity) {
        await Cart.addItem(customerId, productId, quantity);
        Inventory.removeItem(productId, quantity);
        res.status(200).send(`Added ${quantity} of product ${productId} to cart for customer ${customerId}`);
    } else {
        res.status(400).json({
            status: 'Failed',
            message: 'Not enough quantity in stock'
        });
    }
};

exports.getItems = async(req, res) => {
    const data = await Cart.getItems();
    res.status(200).json({
        status: 'success',
        data
    })
}

// delete,change,get