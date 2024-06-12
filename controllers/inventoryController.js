const Inventory = require('../models/Inventory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.getItem = catchAsync(async(req, res) => {
    const data = await Inventory.getItems();
    if(!data){
        const err = new AppError('Something went wrong');
        return err.transfer(res);
    }
    res.status(200).json({
        status: 'success', 
        data
    })
});

exports.addItem = catchAsync(async(req, res, next) => {
    const { name, type, quantity, price } = req.body;
    if(!name || !quantity || !type|| !price){
        const err = new AppError('Some of this parameter (productId, name, quantity, price) not specified', 404);
        return err.transfer(res);
    }
    const data = await Inventory.addItem( name, type, quantity, price);
    if(!data){ 
        const err = new AppError('Some Error occured!');
        return err.transfer(res);
    }
    res.status(200).json({
        status: 'success',
        data
    });
});

exports.removeItem = catchAsync(async(req, res) => {
    const { productId, quantity } = req.body;
    if(!productId || !quantity){
        const err = new AppError('Some of this parameter (productId, quantity) not specified', 400)
        return err.transfer(res);
    }
    console.log(req.customer.customerId, quantity);
    const data = await Inventory.removeItem(productId, quantity, req.customer.customerId);
    if(!data){
        const err = new AppError('Quantity to be deleted is higher than available in stock', 400)
        return err.transfer(res);
    }
    res.status(200).json({
        status: 'success',
        message: 'Items removed',
        remainig: data
    });
});
