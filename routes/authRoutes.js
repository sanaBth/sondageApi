
const express = require('express');
const router =  express.Router();
const bcrypt = require ('bcrypt')
const jwt = require("jsonwebtoken");
const User = require('../models/user');
require("dotenv").config();


// register user with hashed passwored
router.post ("/createUser", async (req,res) => {
    let newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password =  await bcrypt.hash(req.body.password, 10)
    User.findOne({email:req.body.email}, function(err, user){
        if(!user) {
            newUser.save()
            .then(result =>res.status(201).json(result) )
            .catch(err => res.status(500).json(err)); 
        }
        else {
            res.status(500).json("email existe deja");
          }
    });


})

//login
 router.post("/login", async (req,res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) 
    {
      return res.status(404).json({
       
        message: "Email not found",
      });
    } 
   else
   {
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) 
            {
               const token=jwt.sign({
                   id:user._id,
                   email:user.email
               },
               process.env.TOKEN_KEY,{
                   expiresIn:86400
               });
              
                return res.json({success: true,user, token:token});
            } else 
            {
                res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
   })
}
      }) ;

 //add vote to user
 router.put('/user/:idu/:idt', async (req, res)=>{
    let iduser = req.params.idu;
    let idsujet = req.params.idt;
  
    User.findByIdAndUpdate(
      iduser,{  $push: { todos: idsujet }}
      ,{new : true}
    ).then(result => res.json(result))
    .catch(err => res.status(500).json(err))
    } );

module.exports = router;