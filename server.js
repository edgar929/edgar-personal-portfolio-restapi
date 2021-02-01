const express = require('express')
const routes =  require('./routes/index')
const bodyParser = require('body-parser');
const app = express();
const dbConnection = require('./Db/dbConnection.js')

dbConnection();
app.use(function (res, req, next) {
    req.header("Access-control-Allow-Origin", "*");
    req.header("Access-control-Allow-Headers", "Origin,x-Requested-with, Content-Type, Accept");
    req.header('Access-control-Allow-Methods', 'PUT','POST','GET','DELETE', 'OPTIONS');
    next();
})
app.use(express.json({extended: false}));
app.use('/api', routes);
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('server started');
})
app.get('/',(req,res)=>{
 res.send('Welcome to my portfolio')
})
module.exports = app
