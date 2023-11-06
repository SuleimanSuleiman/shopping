const Product = require('../models/product')
const {
    handleError,
    handleStatus
} = require('../utils/handleErrors')

module.exports.createProduct = async (req, res, next) => {
    const newProduct = req.body
    try {
        const newPro = await Product(newProduct)
        const thePro = await newPro.save()
        res.status(200).json(thePro)
    } catch (err) {
        console.log(err)
        const errors = await handleError(err)
        next(handleStatus(500, errors))
    }
}

module.exports.updateProduct = async (req, res, next) => {
    let theUser;
    try {
        theUser = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })
        res.status(200).json(theUser)
    } catch (err) {
        if (theUser == null) {
            next(handleError(501, 'we can not found this user'))
        }
        next(handleError(501, err))
    }
}