let mongoose = require('mongoose');

let testscore = mongoose.model('testscore',{
    candidate_id:{ type:mongoose.Schema.ObjectId, ref:"candidate" },
    first_round: { type:Number },
    second_round:{ type:Number },
    third_round:{ type:Number },
    FirstScore:{ type:String }, 
    SecondScore:{ type:String }, 
    thirdScore:{ type:String }, 
   
    created_date: { type: Date, required: true,default: Date.now }
});

module.exports = testscore;