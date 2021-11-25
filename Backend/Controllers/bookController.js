const mongo=require("mongoose");

const Users=mongo.model('users');
const book=mongo.model('bookings');
exports.baseRoute= async(req,res)=>{
    res.send('Server Running');
}
exports.adduser= async(req,res)=>{
  let data=({
    username:req.body.username,
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

// exports.getuserdata()=async(req,res)=>{
//     const book=await users.find();
//     res.json(book);
// }

exports.getbookings= async(req,res)=>{
  const book=await bookings.find();
  res.json(book);
}