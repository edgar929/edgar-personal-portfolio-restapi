const mongoose = require('mongoose')
require('dotenv').config()
// const connectionURL =process.env.NODE_ENV==='test'? process.env.db_test_url:process.env.dbConnection;
const connectDb = async()=>{
    try {
        if(process.env.NODE_ENV==='test'){
            await mongoose.connect(process.env.db_test_url,{
                // useMongoClient:true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });
            console.log('connected')
        }
            await mongoose.connect(process.env.dbConnection,{
                // useMongoClient:true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });
          
    } catch (error) {
        
    }
   
}


module.exports = connectDb;
