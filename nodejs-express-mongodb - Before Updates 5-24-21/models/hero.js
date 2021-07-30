const mongoose = require('mongoose');

var Hero = mongoose.model('heroes',  {
    name: { type: String },
    rank : {type: Number }
  });

  module.exports =  { Hero } ;