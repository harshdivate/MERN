const path=require('path');
const express=require('express');
const app=express();
const PORT=process.env.PORT || 3500;
const cors = require('cors');
const {logger}=require('./middleware/logEvents');
const errorHandler=require('./middleware/errorHandler')
const corsOptions=require('./config/corsOptions')
const cookieParser=require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');

//custom middleware logger

app.use(logger);



//Cors : Cross origin resource sharing 

app.use(cors(corsOptions));
// Built -In Middleware

app.use(express.urlencoded({extended:false}));

app.use(express.json());


//  Built-In middle ware for cookie parser
app.use(cookieParser());


app.use(express.static(path.join(__dirname,'/public')));



app.use('/',require('./routes/root'))


app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logout'));


app.use(verifyJWT);
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