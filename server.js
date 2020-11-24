const express = require('express')
const routes =  require('./routes/index')
const bodyParser = require('body-parser');
const app = express();

const dbConnection = require('./Db/dbConnection.js')

dbConnection();
app.use(express.json({extended: false}));
app.use('/api', routes);
app.use(bodyParser.json());


const Port = process.env.port || 3000;
app.listen(Port,()=>{
    console.log('server started');
})