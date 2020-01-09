const express = require("express");

const Student = require("../models/student");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get('/students',checkAuth,(req,res,next)=>{
 Student.find()
        .exec()
        .then(docs=>{
            console.log(docs);
            console.log("get all students!");
            res.status(200).json({
                message:'Get stutent list db',
                students:docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });
});

// router.get('/count',(req,res,next)=>{
//     Student
//         .estimatedDocumentCount()
//         .exec()
//         .then(result=>{
//             console.log(result);
//             res.status(200).json({
//                 message:'Get amount of documents in DB',
//                 amount:result
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error:err
//             });
//         });
// });

//Create
router.post('/create',checkAuth,(req,res,next)=>{
    const student = new Student(
        {
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            Gender:req.body.Gender
        }
    );
    student
        .save()
        .then(result=>{
            console.log(result);
            // const amountOfDocument = result.estimatedDocumentCount();
            res.status(200).json(
                {
                    message:'Handling POST requests to /students/create',
                    storeId: result.mongoid,
                    // amount:result.estimatedDocumentCount()
                }               
            );
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });  
});

//Read item byid
router.get('/students/:mongoid',(req,res,next)=>{
     const id = req.params.mongoid;
     Student
         .findById(id)
         .exec()
         .then(docs=>{
             console.log(docs);
             res.status(200).json({
                 message:"OK",
                 docs:docs
             });
         })
         .catch(err => {
             res.status(500).json({
                 error:err
                });
        });
    });

//Another way of update, however, not verify it. Keep it as a reference
// router.patch('/students/:mongoid',(req,res,next)=>{
//     const storeid = req.params.mongoid;
//     const updateOps = {};
//     for(const item of req.body){
//         updateOps[item.propName] = item.value; 
//     };
//     Student
//         .update(
//             {mongoid:storeid},
//             {$set: updateOps}
//             )
//         .exec()
//         .then((result) => {
//             console.log(result);
//             res.status(200).json(
//                 {
//                     message:'Update success!',
//                     result:result
//                 }
//             );
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error:err
//             })
//         });
// });

router.patch('/update/:mongoid',checkAuth,(req,res,next)=>{
    const storeid = req.params.mongoid;   
    Student
        .findByIdAndUpdate(
            storeid,
            req.body,
            {new: true}
        )      
        .then((result) => {
            console.log(result);
            res.status(200).json(
                {
                    message:'Update success!',
                    result:result
                }
            );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
});


router.delete('/delete/:mongoid',checkAuth,(req,res,next)=>{
    const storeid = req.params.mongoid;   
    Student
        .findByIdAndRemove(storeid)      
        .then((result) => {
            console.log(result);
            res.status(200).json({message:'Delete success!'});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
});

module.exports = router;