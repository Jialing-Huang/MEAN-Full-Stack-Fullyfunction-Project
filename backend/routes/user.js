const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup",(req,res,next)=>{
    bcrypt.hash(req.body.password,10)
          .then(hash=>{
              const user = new User({
                  email:req.body.email,
                  password:hash
              });
              user.save()
                  .then(result=>{
                      res.status(201).json({
                          message:"User created!",
                          result:result
                      });
                  })
                  .catch(err=>{
                      res.status(500).json({
                        error:"Invalid authentication credentials, maybe repeated email.",
                        message:"Signup failed!! Please check your email again, the same email not allowed to signup twice!"
                      });
                  });
          });
});

router.post("/login",(req,res,next)=>{
    let fetchedUser;   
    //To get the data by email
    User.findOne({email:req.body.email})
        .then(user=>{
            console.log(user);
            //If returned is not a valid email
            if (!user){   
                throw new Error("Auth failed!!!!!  Incorrect email!");            
                // return res.status(401).json({
                //     message:"Auth failed!!!!!  Incorrect email!"
                // });                               
            }else{
                //In case the returned email is valid
            fetchedUser = user;
            //return compare result on password
            return bcrypt.compare(req.body.password, user.password);            
            };
            
        })
        .then(result=>{
            console.log(result);
            //If the compare result is false
            if(!result){
                throw new Error("Auth failed!!!!!  Incorrect password!");
                // return res.status(401).json({
                //     message:"Auth failed!!!!!  Incorrect password!"
                // });
            };
            //In case the returned compare result is true, create a jwt as working like a session
            const token = jwt.sign(
                //jwt.sign() to create a jsonwebtoken
                {email:fetchedUser.email, userId:fetchedUser._id},
                "secret_this_should_be_longer",
                {expiresIn:"1h"}
            );                    
            res.status(200).json({
                token:token    //Will return string of jwt token
                // expiresIn:3600
            });
        })
        .catch(err => {
            return res.status(401).json({
                error:"Invalid authentication credentials, maybe incorrect email or password.",
                message:"Auth failed!! Please check your email or password!"
            });
        });
});

module.exports = router;