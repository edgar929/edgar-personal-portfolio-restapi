const mongoose = require('mongoose')

const articles = new mongoose.Schema({
    title:{
        type:String
    },
    summary:{
        type:String
    },
    picture:{
        type:String
    },
    content:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
      
},
{
    timestamps:true
});

module.exports = Articles = mongoose.model('articles',articles)