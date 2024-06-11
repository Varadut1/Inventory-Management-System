const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(morgan('dev'));

const inventory = require('./routes/inventoryRoutes');
const cart = require('./routes/cartRoutes');
const discount = require('./routes/discountRoutes');
const customer = require('./routes/customerRoutes');

app.use(bodyParser.json());

app.use('/inventory', inventory);
app.use('/cart', cart);
app.use('/discount', discount);
app.use('/customer', customer);

module.exports = app;