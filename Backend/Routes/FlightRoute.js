const express=require('express');
const router=express.Router();

const bookController=require('../Controllers/FlightController');

router.post('/insert',bookController.addbook);

router.get('/getflights/:source/:destination', bookController.getsinglebook);


module.exports=router;
