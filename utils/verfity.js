const { handleStatus } = require("./handleErrors")
const jwt              = require('jsonwebtoken') 


module.exports.verfityAdmin = async(req,res,next) =>{
    const theToken = req.cookies.t5yLoihmiV
    if(theToken){
        await jwt.verify(theToken,process.env.JWT_SEC,(err,user) =>{
            if(err) {
                next(handleStatus(403,'you can not access'))
            }else{
                req.user = user
                if(req.user.isAdmin){
                    next()
                }else{
                next(handleStatus(403,'you not admin'))
                }
            }
        })
    }else{
        next(handleStatus(403,'you can not access'))
    }
    
}

module.exports.verfityAdminAndUser =async(req,res,next) =>{
    const theToken = req.cookies.t5yLoihmiV
    if(theToken){
        await jwt.verify(theToken,process.env.JWT_SEC,(err,user) =>{
            if(err) {
                next(handleStatus(403,'you can not access'))
            }else{
                req.user = user
                if(req.user.isAdmin || req.params.id === req.user.id ){
                    next()
                }else{
                next(handleStatus(403,'you not admin'))
                }
            }
        })
    }else{
        next(handleStatus(403,'you can not access'))
    }
    
}