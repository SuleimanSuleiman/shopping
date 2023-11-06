const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        required: true,
        type: String,
        unique: true
    },
    title:{
        required: true,
        type: String,
    },
    imgName:{
        required: true,
        type: String,
    },
    categories:{
        type: Array
    },
    size:{
        type: String
    },
    color:{
        type: String
    },
    price:{
        type: Number,
    }
},{timestamps: true})

module.exports = mongoose.model('Product',productSchema)