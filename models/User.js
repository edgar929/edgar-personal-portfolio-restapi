const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
		unique: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid')
			}
		}
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
//generating auth token
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, 'mynameisedgarilovecoding')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({email})
   
     if(!user){
         throw new Error('unable to login')
     }
     const isMatch = await bcrypt.compare(password,user.password)
     if(!isMatch){
         throw new Error("unable to login")
     }
     return user
}

//hash the plain text password
userSchema.pre('save', async function(next){
   const user = this
   if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password, 8)
   }
   next()
})

module.exports = User = mongoose.model('user',userSchema)