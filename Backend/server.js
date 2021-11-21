const mongo=require('mongoose');

const express = require('express');
const cors = require('cors');
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

require('./Models/books');

const application=require('./app');

//const bookController=require('../Controllers/FlightController');
app.use(cors({ origin: 'http://localhost:4200/bookingpage' }));

const flights = [

  {
      id:1, Departure:'Jaipur', Arrival:'Andaman', Price:'72,203', Duration:'12hrs30min', Airline:'Air India', DepartureTime:'13:30',ArrivalTime:'01:00'
  },
  {
      id:2, Departure:'Andaman', Arrival:'Jaipur', Price:'71,203', Duration:'28hrs30min', Airline:'Air India', DepartureTime:'09:45',ArrivalTime:'14:15'
  },
  {
      id:3, Departure:'Kerala', Arrival:'Andaman', Price:'72,203', Duration:'5hrs', Airline:'Indigo', DepartureTime:'07:30',ArrivalTime:'12:30'
  },
  {
      id:4, Departure:'Kerala', Arrival:'Andaman', Price:'31,462', Duration:'25hr10min', Airline:'SpiceJet', DepartureTime:'23:15',ArrivalTime:'00:25'
  },
  {
      id:5, Departure:'Kerala', Arrival:'Jaipur', Price:'35,868', Duration:'7hr30min', Airline:'Go First', DepartureTime:'11:30',ArrivalTime:'19:00'
  }
  
  ]



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});
//app.post('/insert',bookController.addbook);
app.get('/flights', function (req, res) {
  res.send(flights);
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})