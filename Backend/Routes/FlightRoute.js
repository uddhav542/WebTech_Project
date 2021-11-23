const express=require('express');
const router=express.Router();

const flightController=require('../Controllers/FlightController');
const userController=require('../Controllers/bookController')

router.post('/insert',flightController.addbook);
router.post('/adduser',userController.adduser);
//router.get('/getuser/',userController.getuserdata);
router.get('/flights/:source/:destination', flightController.getsinglebook);


module.exports=router;
