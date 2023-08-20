const express=require('express');
const router=express.Router();
const path=require('path');



router.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})


router.get('/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','new-page.html'));
})

// router.get('/pagge.html',(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','pagge.html'))
// })


router.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301,'/pagge.html');
});

module.exports=router;