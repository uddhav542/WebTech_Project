const mongo=require("mongoose");
mongo.Promise=global.Promise;
//book schema
const userschema=new mongo.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
});

module.exports=mongo.model('users',userschema);