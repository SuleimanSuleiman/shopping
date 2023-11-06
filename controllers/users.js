const User = require('../models/user')
const {handleError,handleStatus} = require('../utils/handleErrors')


module.exports.updateUser = async(req,res,next) =>{
    try{
        let theUser = await User.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true})
        // await theUser.save()
        const {password,isAdmin,...other} = theUser._doc
        res.status(200).json({...other})
    }catch(err){
        console.log(err)
        const errors = await handleError(err)
        next(handleStatus(401,errors))
    }
}

module.exports.deleteUser = async(req,res,next) =>{
    let theUser;
    try{
        theUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(`the User id:${theUser.id} and name: ${theUser.username} is delete`)
    }catch(err){
        if(!theUser) next(handleStatus(401,`can not found user with id ${req.params.id}`))
        else{
            next(handleStatus(401,'can not delete the User'))
        }
    }
}

module.exports.getUsers   = async(req,res,next) =>{
    try{
        const Users = await User.find().limit(req.query.limit)
        res.status(200).json(Users)
    }catch(err){
        console.log(err)
        next(handleStatus(401,'there are error'))
    }
}

module.exports.getUser   = async(req,res,next) =>{
    let THEUSER
    try{
        THEUSER = await User.findById(req.params.id)
        const {password,isAdmin,...other} = THEUSER._doc
        res.status(200).json({...other})
    }catch(err){
        if(!THEUSER) next(handleStatus(401,`can not found user with id ${req.params.id}`))
        else{
            next(handleStatus(401,'can not Get the User'))
        }
    }
}