const mongo=require("mongoose");
mongo.Promise=global.Promise;
//book schema
const flightschema=new mongo.Schema({
    Departure:{
        type:String
    },
    Arrival:{
        type:String
    },
    Price:{
        type:String
    },
    Duration:{
		type:String
	},
	AirLine:{
        type:String
    },
	DepartureTime:{
        type:String
    },
	ArrivalTime:{
        type:String
    },
	
});

module.exports=mongo.model('bookings',flightschema);