const mongo=require("mongoose");
mongo.Promise=global.Promise;
//book schema
const bookschema=new mongo.Schema({
    email:{
        type:String
    },
    source:{
        type:String
    },
    destination:{
        type:String
    },
	arrival_time:{
        type:Date
    },
	departure_time:{
        type:Date
    },
	date:{
		type:Date
	},
	
});

module.exports=mongo.model('books',bookschema);