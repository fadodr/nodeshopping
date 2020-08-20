const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productrouter = require('./router/product');
const cartrouter = require('./router/cart');
const orderrouter = require('./router/order')
const mongoose = require('mongoose');
const userrouter = require('./router/users');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


app.use('/product', productrouter);
app.use('/cart', cartrouter);
app.use('/order', orderrouter);
app.use('/user', userrouter);
app.use('/images', express.static('images'));

app.use((req, res, next)=> {
    const err = new Error('Not found');
    err.statuscode = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.statuscode).json({
        error : err.message
    })
})

mongoose.connect('mongodb+srv://fadodatabase:playboy10@shop.kqlba.mongodb.net/shoppingcart?retryWrites=true&w=majority')
.then( result => {
    console.log('connected')
})

module.exports = app;