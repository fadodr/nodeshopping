const mongoose = require('mongoose');
const Order = require('../schema/orderschema');
const Cart = require('../schema/cartschema');

exports.addorder = async ( req, res, next) => {
    const user = req.body.user;
    const carts = req.body.carts
    var totalamount = 0;
    try {
        for ( index in carts){
            const cart =await Cart.findById(carts[index].cartItem)
            totalamount = totalamount + cart.amount
        }
        const orders = new Order({
            user : user,
            cart : carts,
            totalamount : totalamount
        })
        try{
            const order = await orders.save();
            res.status(201).json({
                createdOrder : order
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

exports.getorders = async ( req, res, next) => {
    try {
        const orders = await Order.find().populate('user').populate({path:'cart',populate: { path: 'cartItem', populate:{ path : 'product'} }});
        res.status(200).json({
            order : orders
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    } 
}
exports.getsingleorder = async ( req, res, next) => {
    const Id = req.params.id;
    try {
        const orders = await Order.findById(Id).populate({path:'cart',populate: { path: 'cartItem', populate:{ path : 'product'} }});
        res.status(200).json({
            order : orders
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    } 
}
