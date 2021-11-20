const express=require('express');
const router=express.Router();

const bookController=require('../Controllers/bookController');

router.get('/',bookController.baseRoute);

router.get('/getbooks',bookController.getbooks);

router.get('/getbooks/:id',bookController.getsinglebook);

router.post('/insert',bookController.addbook);

router.get('/getbooks/:id', bookController.getsinglebook);

// update
router.put('/book/:id/update', bookController.updateBook);

// delete
router.delete('/delete/:id', bookController.deleteBook);

module.exports=router;