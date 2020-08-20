const mongoose = require('mongoose');

const orderschema = new mongoose.Schema({
    user : {
        type:  Object,
        required: true,
        ref : 'User'
    },
    cart : [
        {
           cartItem : {
                type : Object,
                required : true,
                ref : 'Cart'
            } 
        }  
    ],
    totalamount : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('Order', orderschema);