let express = require('express');
const candidate = require('../models/candidate');

let app = express();
app.post('/add',function (req, res){
    var newCandidate = new candidate({
        name: req.body.name,
        email:req.body.email,
    });
    newCandidate.save(function(err,doc){
        if(doc){
     res.json({
         data:doc,
         msg:"candidate add successfully!!",
         status:200,
     });
     }else{
         res.json({
             msg:"oops somthink worng please check code !!",
             status:200,
         });
     }
    });
 
 });


module.exports = app;