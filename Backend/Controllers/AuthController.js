const User=require('../Models/users');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const register =(req,res,next)=>{
   
    let user = new User({
        email:req.body.email,
        password:req.body.password
    })
    user.save().then(user=>{
        res.json({
            message:'registered successfully'
        })
    })
    .catch(error=>{
        res.json({
            message:'error occured!'
        })
    })
        
}

const login = (req,res,next)=>{
    var username = req.body.email;
    var pass = req.body.password;
    User.findOne({$and:[{email:username},{password:pass}]})
    .then(user=>{
        if(user){
            res.json({
                "email":username,
                "password":pass
            })
        }
        else{
            res.json({
                "email":"",
                "password":""
            })
        }

    })
}

module.exports = {
    register,login
}