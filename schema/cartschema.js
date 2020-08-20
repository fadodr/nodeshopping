const mongoose = require('mongoose')

const cartschema = new mongoose.Schema({
    product : {
        type : Object,
        required : true,
        ref : 'Product'
    },
    quantity : {
        type : Number,
        default : 1
    },
    amount : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('Cart', cartschema);