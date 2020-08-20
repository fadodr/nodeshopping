const mongoose = require('mongoose');
const Product = require('../schema/productschema');

exports.addproduct = ( req, res, next ) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageurl = req.file.path;

    const product = new Product({
        name : name,
        price : price,
        description : description,
        imageurl : imageurl
    })
    product.save()
    .then( response => {
        res.status(201).json({
            messsage : 'Product created successfully',
            createdProduct : response
        })
    })
    .catch( err => {
        res.status(500).json({
            error : err
        })
    })
}

exports.getproducts = async ( req, res, next) => {
    try {
        const product = await Product.find()
        res.status(200).json({
            products : product
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    } 
}

exports.getsingleproduct = async ( req, res, next ) => {
    const Id = req.params.id
    try {
        const prod = await Product.findById(Id)
        res.status(200).json({
            product : prod
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    } 
}