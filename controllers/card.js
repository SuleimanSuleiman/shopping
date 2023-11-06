const Card = require('../models/cart')

module.exports.createCard = async(req,res,next) =>{
    const newCard = req.body
    try{
        const migrateCard = await Card(newCard)
        const TheCard = await migrateCard.save()
        res.status(200).json(TheCard)
    }catch(err){
        console.log(err)
        const errors = await handleError(err)
        next(handleStatus(500,errors))
    }
}