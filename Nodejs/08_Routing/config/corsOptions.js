const whitelist=[
    'https://www.yoursite.com',
    'https://127.0.0.1:5500',
    'http://localhost:3500'
];

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

module.exports=corsOptions;