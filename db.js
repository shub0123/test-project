let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testResult',{ useUnifiedTopology: true },function(err,con){
   if(err){
    console.log('Opps Mongodb not conected!!')
   }else{
    console.log('MongoDB Conected!')
   }
});
