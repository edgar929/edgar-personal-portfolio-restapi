const mongoose = require('mongoose')
const User = require('../models/User')

exports.createUser = async(req,res)=>{
    const user = new User({
        email:req.body.email,
        password:req.body.password
    })
    try {
       const data = await user.save()
       const token = await user.generateAuthToken()
       res.send({
           message:"created successfully",
           user: data,
           token:token
       })
    } catch (error) {
        res.status(400).send(error.message)
    }

}

exports.loginUser = async(req,res)=>{
   try {
       const user = await User.findByCredentials(req.body.email, req.body.password)
       const token = await user.generateAuthToken()

       res.send({user, token})
   } catch (error) {
       res.send(error.message)
   }
}

exports.getUSer = async(req,res)=>{
      res.send(req.user)
}
exports.logout = async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
}