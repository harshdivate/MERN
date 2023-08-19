const http = require('http');
const fs = require('fs');
const path = require('path')
const fsPromise=require('fs').promises;

const logEvent=require('./logEventss');
const EventEmitter=require('events');
class Emitter extends EventEmitter{};

myEmitter =new Emitter();

// myEmitter.on('log',(msg)=>logEvent(msg));
// myEmitter.emit('log','Log Event Emitted');



const PORT = process.env.PORT || 3500;

const serveFile=async(filePath,contentType,response)=>{
    try{
        const rawData=await fsPromise.readFile(filePath,'utf-8');
        const data= contentType === 'application/json' 
                    ? JSON.parse(rawData) : rawData;
    
        response.writeHead(200,{'Content-Type':contentType});
        response.end(
            contentType === 'application/json' ? data : rawData
        );
    }
    catch(err){
        console.log(err);
        res.statusCode=500;
        res.end();
    }
}

const server=http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.method);
    
    const extension=path.extname(req.url);
    console.log("Extension is"+extension);

    let contentType;

    switch(extension){
        case '.css':
            contentType='text/css';
            break;

        case '.js':
            contentType='text/javascript';
            break;

        case '.json':
            contentType='application/json';
            break;
        
        case '.jpg':
            contentType='image/jpeg';
            break;

        default:
            contentType= 'text/html';             
    }

    let filePath=
        contentType === 'text/html' && req.url === '/'
        ? path.join(__dirname,'views','index.html')
        : contentType === 'text/html' && req.url.slice(-1) === '/'
        ? path.join(__dirname,'views',req.url,'index.html')
        : contentType === 'text/html'
        ? path.join(__dirname,'views',req.url)
        : path.join(__dirname,req.url);


    if(!extension && req.url.slice(-1)!=='/') filePath+='.html';

    const fileExists=fs.existsSync(filePath)
    if(fileExists){
        //Serve the file 
        serveFile(filePath,contentType,res)
    }
    else{
        //404 or 301
        switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301,{'Location':'/new-page.html'});
                res.end();
                break;
        
            case 'www-page.html':
                res.writeHead(301,{'Location':'/'});
                res.end();
                break;

            default :
                //serve a 404 response
                serveFile(path.join(__dirname,'views','404.html'),'text/html',res)

    
        console.log(path.parse(filePath));
    }
}})

server.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`);
})