const mongo=require("mongoose");
mongo.Promise=global.Promise;
//book schema
const bookschema=new mongo.Schema({
    title:{
        type:String
    },
    author:{
        type:String
    },
    desc:{
        type:String
    }
});

module.exports=mongo.model('books',bookschema);