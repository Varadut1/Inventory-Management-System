const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const { promisify } = require('util');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = mail => {
    return jwt.sign({ mail }, process.env.SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

  
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.email);
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };


exports.signup = catchAsync(async(req, res, next) => {
    const { name, email, password } = req.body;
    const customer = await Customer.createCustomer(name, email, password);
    if(!customer){
      const err = new AppError('Cannot create new customer because customer with same Mail already exists!', 400);
      err.transfer(res);
    }
    createSendToken(req.body, 201, res);
});

exports.signIn = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const customer = Customer.validateCustomer(email, password);
    if (customer) {
        const token = jwt.sign({ email: customer.email }, secretKey);
        res.status(200).json({ token });
    } else {
      const err = new AppError('Authentication failed. Invalid email or password.', 400);
      err.transfer(res);
    }
});



exports.protect = catchAsync(async(req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
  }
  // getting token
  // console.log(token);
  // verifying token
  if(!token){
    const err = new AppError('You are not logged in! Please login again.', 401);
    err.transfer(res);
  }
  // if success check user exists
  
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
  // check if user changed password after token was issued
  console.log(decoded);

  // req.user = freshUser;
  if(!freshUser){
    return next(new AppError('The user belonging to token no longer exists', 401));
  }
  if(freshUser.changedPasswordAfter(decoded.iat)){
      return next(new AppError('User recently changed the password! Please log in again'), 401)
  }
  next();
});
