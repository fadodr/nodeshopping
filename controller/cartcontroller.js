const mongoose = require('mongoose');
const Cart = require('../schema/cartschema');
const Product = require('../schema/productschema');

exports.addcart = async ( req, res, next) => {
    const productId = req.body.productId;
    const quantity = req.body.quantity || 1;
    try {
        const prod = await Product.findById(productId)
        const amount = prod.price * quantity
        const cart = new Cart({
            product : productId,
            quantity : quantity,
            amount : amount
        })
        try{
            const cartitems = await cart.save();
            res.status(201).json({
                createdCart : cartitems
            })
        }
        catch(err){
            res.status(500).json({
                error : err
            })
        }
    } 
    catch(err){
        const errror = new Error('product not found')
        error.statuscode = 404;
        throw error
    }
}

exports.getcarts = async ( req, res, next) => {
    try {
        const cartitems = await Cart.find().populate('product')
        res.status(200).json({
            cart : cartitems
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    } 
}

exports.getsinglecart = async ( req, res, next ) => {
    const Id = req.params.id
    try {
        const cartitem = await Cart.findById(Id).populate('product')
        res.status(200).json({
            cart : cartitem
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    } 
}