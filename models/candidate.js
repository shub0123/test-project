let mongoose = require('mongoose');

let candidate = mongoose.model('candidate',{
      name: { type:String, required: true},
      email:{ type:String,},
      created_date: { type: Date, required: true,default: Date.now },
});

module.exports = candidate;
