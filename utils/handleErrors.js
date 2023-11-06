function handleError(err){

    let errors ={username:"",password:"",email: ""}

    if(err.code === 11000){
        err.keyPattern.email?errors['email'] = 'pleace input with another email':errors['username'] = 'pleace input with another username'
    }

    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(err =>{
            errors[err.path] = err.message
        })
    }
    if(err.message.includes('pleace try with strong password')){
        errors['password'] = 'pleace try with strong password'
    }
    return errors
}

function handleStatus(status,errors){

    let err = new Error()
    err.status  = status
    err.message = errors
    return err
}

module.exports = {
    handleError,
    handleStatus
}