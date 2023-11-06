const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    product:[
        {
            productId:{
                type: String,
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
})

module.exports = mongoose.model('Cart',cartSchema)