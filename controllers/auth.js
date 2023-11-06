const User = require('../models/user')
const {handleError,handleStatus} = require('../utils/handleErrors')
const jwt = require('jsonwebtoken')


module.exports.register = async(req,res,next) =>{
    try{
        const newUser = {
            username : req.body.username,
            email    : req.body.email,
            password : req.body.password,
            isAdmin  : req.body.isAdmin
        }
        theUser        = await User(newUser)
        const token    = jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.JWT_SEC,{expiresIn:'3d'})
        res.cookie('t5yLoihmiV',token,{httpOnly: true,maxAge:100*60*24*24*3})
        const saveUser = await theUser.save()
        const {password,isAdmin,...other} = saveUser._doc
        res.status(201).json({...other})
    }catch(err){
        const errors = await handleError(err)
        next(handleStatus(401,errors))
    }
}

module.exports.login   = async(req,res,next) =>{
    try{

        theUser = await User.login(req.body.username,req.body.password)

        const token = jwt.sign({id:theUser._id,isAdmin:theUser.isAdmin},process.env.JWT_SEC,{expiresIn:'3d'})
        res.cookie('t5yLoihmiV',token,{httpOnly: true,maxAge:100*60*24*24*3})

        const {password,isAdmin,...other} = theUser._doc
        res.status(201).json({...other})

    }catch(err){
        next(handleStatus(401,err.message))
    }
}

