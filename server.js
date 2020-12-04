const express = require('express')
const routes =  require('./routes/index')
const bodyParser = require('body-parser');
const app = express();
const dbConnection = require('./Db/dbConnection.js')

dbConnection();
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
