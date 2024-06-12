const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const { promisify } = require('util');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = customerId => {
    return jwt.sign({ customerId }, process.env.SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

  
const createSendToken = (customer, statusCode, res) => {
    const token = signToken(customer.customerId);
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        customer
      }
    });
  };


exports.signup = catchAsync(async(req, res, next) => {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) {
      const err = new AppError('Please provide email, password and name!', 400);
      return err.transfer(res);
    }
    if(role){
      const err = new AppError('You are not authorized to set roles', 400);
      return err.transfer(res);
    }
    const customer = await Customer.createCustomer(name, email, password);
    if(!customer){
      const err = new AppError('Cannot create new customer because customer with same Mail already exists!', 400);
      return err.transfer(res);
    }
    createSendToken(customer, 201, res);
});

exports.signIn = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = new AppError('Please provide email and password!', 400);
      return err.transfer(res);
    }
    const customer = Customer.validateCustomer(email, password);
    if (customer) {
      createSendToken(customer, 200, res);
    } else {
      const err = new AppError('Authentication failed. Invalid email or password.', 400);
      return err.transfer(res);
    }
});



exports.protect = catchAsync(async(req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
    token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
  }
  if(!token){
    const err = new AppError('You are not logged in! Please login again.', 401);
    return err.transfer(res);
  }
  
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

  const freshUser = await Customer.findCustomerById(decoded.customerId);
  if(!freshUser){
    const err = new AppError('The user belonging to token no longer exists', 401);
    return err.transfer(res);
  }
  req.customer = freshUser;
  next();
});


exports.restrictTo = (...roles) =>{
  return (req, res, next) => {
      if(!roles.includes(req.customer.role)){
        const err = new AppError('You do not have permission to perform this action!', 404)
          return err.transfer(res);
      }
      next();
  }
}

exports.getCustomer = catchAsync(async(req, res) =>{
  const data = await Customer.getCustomers();
  for(const key in data){
    data[key].password = undefined;
  }
  if(!data){
    const err = new AppError('No customers found', 404);
    return err.transfer(res);
  }
  res.status(200).json({
    status: 'success',
    data
    });
})