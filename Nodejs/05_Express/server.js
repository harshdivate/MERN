const path=require('path');
const express=require('express');
const app=express();
const PORT=process.env.PORT || 3500;
const cors = require('cors');
const {logger}=require('./middleware/logEvents');
const errorHandler=require('./middleware/errorHandler')

//custom middleware logger

app.use(logger);



//Cors : Cross origin resource sharing 
const whitelist=['https://www.yoursite.com','https://127.0.0.1:5500','http://localhost:3500'];

const corsOptions={
    origin:(origin,callback)=>{
        if(whitelist.indexOf(origin)!=-1 || !origin ){
            callback(null,true);
        }else{
            callback(new Error ('Not allowed by Cors'));
        }
    },
    optionsSuccessStatus:200
}
app.use(cors(corsOptions));
// Built -In Middleware
app.use(express.urlencoded({extended:false}));

app.use(express.json());
console.log(__dirname);

app.use(express.static(path.join(__dirname,'/public')));




app.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
})


app.get('/new-page.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'));
})

// app.get('/pagge.html',(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','pagge.html'))
// })


// app.get('/old-page.html',(req,res)=>{
//     res.redirect(301,'/pagge.html');
// })

// // No url

// //Route Handlers
// app.get('/hello(.html)?',(req,res,next)=>{
//     console.log('Attempted to load hello.html');
//     next()
// },(req,res)=>{
//     res.send('Hello World');
// })


// const one=(req,res,next)=>{
//     console.log('one');
//     next()
// }
// const two=(req,res,next)=>{
//     console.log('two');
//     next();
// }
// const three=(req,res)=>{
//     console.log('Three');
//     res.send('Finished');
// }


// app.get('/chain(.html)?',[one,two,three]);

// app.get('/*',(req,res)=>{
//     res.status(404).sendFile(path.join(__dirname,'views','404.html'))
// })


app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`);
})