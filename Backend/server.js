const mongo=require('mongoose');

const express = require('express');
//const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config({path:'.env'});

const app = express();

mongo.connect(process.env.DATABASE,{
    useUnifiedTopology:true,
    useNewUrlParser:true
});

mongo.Promise=global.Promise;
mongo.connection.on('error',(err)=>{
    console.log(`DAtabase Connection error->${err.message}`);

});

require('./Models/flights');
require('./Models/users');

const application=require('./app');

const bookController=require('./Controllers/FlightController');
const userController=require('./Controllers/bookController');
//app.use(cors({ origin: 'http://localhost:4200/bookingpage' }));

const flights = [

  {
      id:1, Departure:'Jaipur', Arrival:'Andaman', Price:'72,203', Duration:'12h30m', Airline:'Air India', DepartureTime:'13:30',ArrivalTime:'01:00'
  },
  {
      id:2, Departure:'Andaman', Arrival:'Jaipur', Price:'71,203', Duration:'28h30m', Airline:'Air India', DepartureTime:'09:45',ArrivalTime:'14:15'
  },
  {
      id:3, Departure:'Kerala', Arrival:'Andaman', Price:'72,203', Duration:'5h', Airline:'Indigo', DepartureTime:'07:30',ArrivalTime:'12:30'
  },
  {
      id:4, Departure:'Kerala', Arrival:'Andaman', Price:'31,462', Duration:'25h10m', Airline:'SpiceJet', DepartureTime:'23:15',ArrivalTime:'00:25'
  },
  {
      id:5, Departure:'Kerala', Arrival:'Jaipur', Price:'35,868', Duration:'7h30m', Airline:'Go First', DepartureTime:'11:30',ArrivalTime:'19:00'
  },
  {
      id:6, Departure: 'Jaipur', Arrival:'Kerala', Price:'13,873', Duration:'8h:15min', Airline:'Air Asia', DepartureTime:'11:50', ArrivalTime:'8:05'	
  },
  {
      id:7, Departure: 'Ladakh', Arrival:'Jaipur', Price:'10,491', Duration:'7h:50min', Airline:'Spice Jet', DepartureTime:'12:20', ArrivalTime:'8:10'	
  },
  {
      id:8, Departure: 'Jaipur', Arrival:'Ladkah', Price:'36,980', Duration:'11h:45min', Airline:'Air India', DepartureTime:'8:35', ArrivalTime:'8:20'	
  },	
  {
      id:9, Departure: 'Ladakh', Arrival:'Kerala', Price:'23,408', Duration:'9h:10min', Airline:'Indi-Go', DepartureTime:'1:35', ArrivalTime:'10:45'	
  },
  {
      id:10, Departure: 'Ladakh', Arrival:'Andaman', Price:'40,351', Duration:'44h:10min', Airline:'Air India', DepartureTime:'11:50', ArrivalTime:'8:00'	
  },
  {
      id:11, Departure: 'Andaman', Arrival:'Ladakh', Price:'40,870', Duration:'20h:30min', Airline:'Vistara', DepartureTime:'12:10', ArrivalTime:'8:40'	
  },
  {
      id:12, Departure: 'Kerala', Arrival:'Ladakh', Price:'98,192', Duration:'18h:55min', Airline:'Air India', DepartureTime:'1:25', ArrivalTime:'8:20'	
  },
  {
      id:13, Departure: 'Kerala', Arrival:'Ladakh', Price:'22,289', Duration:'12h:45min', Airline:'Vistara', DepartureTime:'7:55', ArrivalTime:'8:40'	
  },
  {
      id:14, Departure: 'Kerala', Arrival:'Jaipur', Price:'74,476', Duration:'16h:55min', Airline:'Air Asia', DepartureTime:'9:05', ArrivalTime:'2:00'	
  },
  {
      id:15, Departure: 'Jaipur', Arrival:'Andaman', Price:'113,625', Duration:'18h:45min', Airline:'Air India', DepartureTime:'1:30', ArrivalTime:'8:15'	
  }, 
  {
    id:15, Departure: 'Andaman', Arrival:'Kerala', Price:'11,625', Duration:'1h:45min', Airline:'Indigo', DepartureTime:'1:30', ArrivalTime:'15:00'	
  },
  {
    id:15, Departure: 'Jaipur', Arrival:'Ladakh', Price:'13,625', Duration:'8h:45min', Airline:'Air India', DepartureTime:'1:10', ArrivalTime:'9:15'	
    },  
  ]



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});


app.post('/insert',bookController.addbook);
app.post('/adduser',userController.adduser);
app.get('/flights', function (req, res) {
  res.send(flights);
});
const U=mongo.model('users');
app.get('/getuser', (req,res)=> {
  U.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
});
});
//app.get('/getuser/:email',userController.getuserdata)
//app.get('/getbookings',userController.getbookings);
const Books=mongo.model('bookings');
app.get('/getbookings', (req, res) => {
  Books.find((err, docs) => {
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
  });
});
app.param('Departure', function(req, res, next, Departure) {
  const modified = Departure;

  req.Departure = modified;
  next();
});

app.param('Arrival', function(req, res, next, Arrival) {
  const modified = Arrival;

  req.Arrival = modified;
  next();
});
app.get('/flights/:Departure/:Arrival', function(req, res) {
  
    const Departure = req.Departure;
    const Arrival = req.Arrival;
    console.log(Departure+" "+Arrival)
    index = flights.findIndex(x => x.Departure ===Departure && x.Arrival == Arrival);
    console.log(index);
    const Price = flights[index].Price;
    const Duration = flights[index].Duration;
    const Airline = flights[index].Airline;
    const DepartureTime=flights[index].DepartureTime;
    const ArrivalTime=flights[index].ArrivalTime;
  
    res.send([
      Departure,
      Arrival,
      Price,
      Duration,  
      Airline,
      DepartureTime,
      ArrivalTime

    ]);
   
    
});

const AuthRoute = require('./Routes/authRoute')

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.use('/api',AuthRoute)