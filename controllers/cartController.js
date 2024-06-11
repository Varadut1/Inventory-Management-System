const Inventory = require('../models/Inventory');
const Cart = require('../models/Cart');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addItem = catchAsync(async(req, res) => {
    const { productId, quantity } = req.body;
    const customerId = req.customer.customerId
    if (Inventory.getQuantity(productId) >= quantity) {
        const added_product = await Cart.addItem(customerId, productId, quantity);
        if(!added_product){
            const err = new AppError('Provided ProductId or CustomerId is not correct, Please Recheck it!', 400);
        }
        const remaining_product = await Inventory.removeItem(productId, quantity);
        res.status(200).json({
            status: 'success',
            added_product,
            remaining_product
        });
    } else {
        res.status(400).json({
            status: 'Failed',
            message: 'Not enough quantity in stock'
        });

    }
});

exports.getItems = async(req, res) => {
    const data = await Cart.getCart(req.customer.customerId);
    res.status(200).json({
        status: 'success',
        data
    })
}

// delete,change,get