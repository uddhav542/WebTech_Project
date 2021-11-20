const mongo=require('mongoose');
require('dotenv').config({path:'.env'});

mongo.connect(process.env.DATABASE,{
    useUnifiedTopology:true,
    useNewUrlParser:true
});

mongo.Promise=global.Promise;
mongo.connection.on('error',(err)=>{
    console.log(`DAtabase Connection error->${err.message}`);

});

require('./Models/books');

const app=require('./app');
const server=app.listen(5000,()=>{
    console.log('express is running');
})