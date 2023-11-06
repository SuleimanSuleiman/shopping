const mongoose  = require('mongoose')
const {isEmail} = require('validator')
const bcrypt    = require('bcryptjs');

const schemaUser = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: [true,"pleace input your name"]
    },
    email:{
        type: String,
        required: [true,"pleace input your enail"],
        unique: true,
        validate:[isEmail,"pleace input currect email"]
    },
    password:{
        type: String,
        requied: [true,"pleace input your password"],
        unique: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

schemaUser.pre('save',async function(next){
    
    if(!this.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ig)){
        throw Error('pleace try with strong password')
    }

    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

schemaUser.statics.login = async function(username,password){
    const user = await this.findOne({username: username})
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }else{
            throw Error('incurrect password !!')
        }
    }else{
        throw Error('incurrect user name !!')
    }
}

module.exports = mongoose.model('User',schemaUser)