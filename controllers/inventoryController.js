const Inventory = require('../models/Inventory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.getItem = catchAsync(async(req, res) => {
    const data = await Inventory.getItems();
    if(!data){
        const err = new AppError('Something went wrong');
        err.transfer(res);
    }
    res.status(200).json({
        status: 'success', 
        data
    })
});

exports.addItem = catchAsync(async(req, res, next) => {
    const { productId, name, quantity, type } = req.body;
    if(!productId || !name || !quantity ){
        const err = new AppError('Some of this parameter (productId, name, quantity) not specified', 404);
        err.transfer(res);
    }
    const done = await Inventory.addItem(productId, name, quantity, type);
    if(!done) return next(new AppError('Some Error occured!'));
    const data = {productId, quantity, name, type}
    res.status(200).json({
        status: 'success',
        data
    });
});

exports.removeItem = catchAsync(async(req, res) => {
    const { productId, quantity } = req.body;
    if(!productId || !quantity){
        const err = new AppError('Some of this parameter (productId, quantity) not specified')
        err.transfer(res);
    }
    const data = await Inventory.removeItem(productId, quantity);
    res.status(200).json({
        status: 'success',
        message: 'Items removed',
        remainig: data
    });
});
