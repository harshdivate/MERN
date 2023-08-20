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


app.use(express.static(path.join(__dirname,'/public')));

app.use('/subdir',express.static(path.join(__dirname,'/public')));


app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir'))
app.use('/employees',require('./routes/api/employee'))






app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    } else if (req.accepts('json')){
        res.json({"Error":"404 not found"})
    } else{
        res.type('text').send("404 not found")
    }
})



app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`);
})