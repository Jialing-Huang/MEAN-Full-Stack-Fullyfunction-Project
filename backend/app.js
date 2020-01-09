const express = require('express');
const app = express();

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// const Student = require('./models/student');

const postsRoutes = require("./routes/students");
const userRoutes = require("./routes/user");

mongoose
  .connect(
    "mongodb+srv://merlin:merlin123@merlin-v2smb.mongodb.net/test"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Set CORS
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-with, Content-Type, Accept, Authorization"
        );
    res.setHeader(
            "Access-Control-Allow-Methods",
            "GET,POST,PATCH,DELETE,OPTIONS"
        );
    next();
});


app.use("",postsRoutes);
app.use("",userRoutes);
module.exports = app;