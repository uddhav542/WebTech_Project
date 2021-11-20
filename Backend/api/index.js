const express = require("express");
const app = express();
//const Joi = require('joi');
app.use(express.json());

const flights = [

{
    id:1, Departure:'Jaipur', Arrival:'Adaman', Price:'72,203', Duration:'12hrs30min', Airline:'Air India', DepartureTime:'13:30'
},
{
    id:2, Departure:'Andaman', Arrival:'Jaipur', Price:'71,203', Duration:'28hrs30min', Airline:'Air India', DepartureTime:'9:45'
},
{
    id:3, Departure:'Kerala', Arrival:'Adaman', Price:'72,203', Duration:'5hrs', Airline:'Indigo', DepartureTime:'7:30'
},
{
    id:4, Departure:'Andaman', Arrival:'Kerala', Price:'31,462', Duration:'25hr10min', Airline:'SpiceJet', DepartureTime:'23:15'
},
{
    id:5, Departure:'Kerala', Arrival:'Jaipur', Price:'35,868', Duration:'7hr30min', Airline:'Go First', DepartureTime:'11:30'
}

]

app.get('/',(req,res)=>{

    res.send('Welcome to flights');

});

app.get('/flights/',(req,res)=>{

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
    console.log(Departure+""+Arrival)
    index = flights.findIndex(x => x.Departure ===Departure && x.Arrival == Arrival);
    console.log(index);
    const Price = flights[index].Price;
    const Duration = flights[index].Duration;
    const Airline = flights[index].Airline;
    const DepartureTime=flights[index].DepartureTime;

  
    res.send({
      'Departure': Departure,
      'Arrival': Arrival,
      'Price': Price,
      'Duration':Duration,  
      'Airline':Airline,
      'DepartureTime':DepartureTime

    });

    
});

app.listen(4200, ()=>console.log("Active"));

