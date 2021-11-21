const mongo=require("mongoose");

const Users=mongo.model('users');
const book=mongo.model('bookings');
exports.baseRoute= async(req,res)=>{
    res.send('Server Running');
}
exports.adduser= async(req,res)=>{
  let data=({
    email:req.body.email,
    password:req.body.password,
  });
   await new Users(data).save((err,data)=>{
       if(err){
           res.status(500).json({
               message:"Something went wrong,please try again later.",
           });
       }
       else{
      res.send(data);
           /*res.status(200).json({
               message:"Book is inserted",
              
           });*/
       }
   });
}

exports.getuserdata=async(req,res)=>{
  let mail=req.param.email;
  await Users.find({ 'email': { $eq:mail  }},(err,data)=>{
      if(err){
          res.status(500).json({
              message:"error",
          });

      }else{
          console.log(data.password);
          res.status(200).json({
              message:"user found",
              //data
          });
      }
  });
}

exports.getbookings= async(req,res)=>{
  const book=await bookings.find();
  res.json(book);
}