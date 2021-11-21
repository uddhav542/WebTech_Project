const express=require('express');
const router=express.Router();

const flightController=require('../Controllers/FlightController');

router.post('/insert',flightController.addbook);

router.get('/flights/:source/:destination', flightController.getsinglebook);


module.exports=router;
