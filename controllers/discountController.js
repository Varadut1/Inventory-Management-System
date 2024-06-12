
const Discount = require('../models/Discount');
const catchAsync = require('../utils/catchAsync');
const Cart = require('../models/Cart');
const AppError = require('../utils/appError');

exports.createDiscount = async (req, res) => {
    const { percentage, maxCap } = req.body;
    try {
        const discount = Discount.createDiscount(percentage, maxCap);
        if(!percentage || !maxCap){
            const err = new AppError('Either of percentage or maxCap not provided', 404);
            return err.transfer(res);
        }
        res.status(201).json({ discount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.applyDiscount = catchAsync(async(req, res) => {
    const discountId = req.params.discountId;
    const cartValue = await Cart.getTotalValue(req.customer.customerId);
    console.log(req.customer)
    if(cartValue<=0){
        const err = new AppError('No items in cart please put items in cart before checkout', 404);
        return err.transfer(res);
    }
    const discount = await Discount.getDiscount(discountId);

    if (discount) {
        const discountAmount = (cartValue * discount.percentage) / 100;
        const finalDiscount = Math.min(discountAmount, discount.maxCap);
        const discountedPrice = cartValue - finalDiscount;

        res.status(200).json({ originalPrice: cartValue, discountApplied: finalDiscount, discountedPrice });
    } else {
        const err = new AppError('Not able to calculate discount due to incorrect discountId', 404);
        err.transfer(res);
    }
});


exports.getDiscount = async (req, res) => {
    const data = await Discount.getAllDiscount();
    if(!data){
        const err = new AppError('No discounts available', 404);
        err.transfer(res);
    }
    res.status(200).json({
        data
    })
};