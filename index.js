const express = require ('express');
var morgan = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const userApi = require('./routes/authRoutes');
const sujetApi = require('./routes/sujetRoutes');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/vote');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();

//api login et register
app.use('/apiuser',userApi);
//api votes
app.use('/api',sujetApi);

app.listen(process.env.port || 
    4000,function(){
    console.log('now listening for requests');
  });
  