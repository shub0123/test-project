const { query } = require('express');
let express = require('express');
const testscore = require('../models/testScore');

let app = express();
app.post('/add',function (req, res){
    var newTestscore = new testscore ({
        candidate_id: req.body.candidate_id,
        first_round:req.body.first_round,
        second_round:req.body.second_round,
        third_round:req.body.third_round,
    });
    newTestscore.save(function(err,doc){
        if(doc){
     res.json({
         data:doc,
         msg:"Score add successfully!!",
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

 app.get('/highestScore',function(err,res){

    // var  query = req.body.query;
    
    testscore.find( function(err, doc){
       
        if(err){
            res.json({
                msg:"No data found !!!!!",
                status:200,
            });
        }else{   
                doc.forEach((t)=>{
                    return t.FirstScore = t.first_round 
                // console.log( t.first_round + t.second_round + t.third_round / 3 )
                })
               
                doc.sort((a, b) => (a.FirstScore < b.FirstScore) ? 1 : -1)

                // get 2nd round highestScore
                testscore.find( function(err, doc2){
                    doc2.forEach((t)=>{
                        return  t.SecondScore = t.second_round;
                    })
                    doc2.sort((a, b) => (a.SecondScore < b.SecondScore) ? 1 : -1)

                    // get 3rd round highestScore
                          testscore.find( function(err, doc3){
                            doc3.forEach((t)=>{
                                return  t.thirdScore = t.third_round;
                            })
                            doc3.sort((a, b) => (a.thirdScore < b.thirdScore) ? 1 : -1)

                            res.json({
                                error:false,
                                firstRound:doc[0],
                                SecondRound:doc2[0],
                                ThirdRound:doc3[0],
                            });
                        }).populate({path:'candidate_id', select:'name'});
        
                }).populate({path:'candidate_id', select:'name'}); 
        }
    }).populate({path:'candidate_id', select:'name'});
});
///////////////////////////////////////////////////////

app.get('/average',function(err,res){

    // var  query = req.body.query;
    
    testscore.find( function(err, doc){
       
        if(err){
            res.json({
                msg:"No data found !!!!!",
                status:200,
            });
        }else{   
            var fristRoundSum = [];

                doc.forEach((t)=>{
                    fristRoundSum.push(t.first_round)
                    // t.FirstAvrg = t.first_round 
                })
               var firstSum = fristRoundSum.reduce((a, b) => a + b, 0)

               var avg = firstSum/fristRoundSum.length

               console.log(avg)
               

                // get 2nd round highestScore
                testscore.find( function(err, doc2){
                    var SecondRoundSum = [];
                    doc2.forEach((t)=>{
                        SecondRoundSum.push(t.second_round)
                      
                    })
                    var SecondSum = SecondRoundSum.reduce((a, b) => a + b, 0)

                    var avg1 = SecondSum/SecondRoundSum.length
     
                    console.log(avg1)

                    // get 3rd round highestScore
                          testscore.find( function(err, doc3){
                           var ThirdRoundSum = [];
                            doc3.forEach((t)=>{
                                ThirdRoundSum.push(t.third_round)
                          
                           })
                           var ThirdSum = ThirdRoundSum.reduce((a, b) => a + b, 0)

                           var avg2 = ThirdSum/ThirdRoundSum.length
            console.log(avg2)

                            res.json({
                                error:false,
                                firstAvrg:avg,
                                SecondAvrg:avg1,
                                ThirdAvrg:avg2,
                            });
                        }).populate({path:'candidate_id', select:'name'});
        
                }).populate({path:'candidate_id', select:'name'}); 
        }
    }).populate({path:'candidate_id', select:'name'});
});

module.exports = app;