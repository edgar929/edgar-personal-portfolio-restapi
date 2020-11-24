const mongoose = require('mongoose')
const { default: validator } = require('validator')

const contact = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = Contact = mongoose.model('contact',contact)