const mongoose = require('mongoose')

const articles = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    summary:{
        type:String
    },
    picture:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:false
    }
      
},
{
    timestamps:true
});
const Articles = mongoose.model('articles',articles)
module.exports = Articles 