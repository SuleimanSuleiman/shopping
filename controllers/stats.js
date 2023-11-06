const { handleError } = require("../utils/handleErrors")
const User            = require('../models/user')

module.exports.year = async(req,res,next) =>{
    try{
        const data     = new Date()
        const lastYear = await new Date(data.setFullYear(data.getFullYear()-1))

        const theData = await User.aggregate([
            {$match:{updatedAt: {$gt: lastYear}}},
            {$project:{createdAt: "$Month"}},
        {$group:{_id:"$createdAt",total: {"$sum":1}}}
        ])
        res.json(theData)
    }catch(err){
        res.json(err)
        next(handleError(501,err))
    }
}
