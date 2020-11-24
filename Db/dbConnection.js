const mongoose = require('mongoose')
require('dotenv').config()
const connectionURL =process.env.dbConnection

const connectDb = async()=>{
    try {
        await mongoose.connect(connectionURL,{
            // useMongoClient:true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('connected')
    } catch (error) {
        
    }
   
}

module.exports = connectDb;
