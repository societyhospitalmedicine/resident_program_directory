var mongoose = require('mongoose');
var env = require('../environment');
var config = require('./config');
if(env!== "production"){
    mongoose.connect(config[env].url);
}else{
    mongoose.connect(process.env['PROD_MONGODB'])
}