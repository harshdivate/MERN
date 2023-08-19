const {format}=require('date-fns');
const {v4:uuid}=require('uuid');

const fs=require('fs');
const fsPromises=require('fs').promises;
const path=require('path');



const logEvents=async (message,logName)=>{
    const time=`${format(new Date(),'yyyy-MM-dd\tHH:MM:SS')}`;
    const logData=`${time}\t${uuid()}\t${message}\n`;
    console.log(logData);
    try{
        // Check is Directory is created or not 
        // If not created then create a directory
        if(!fs.existsSync(path.join(__dirname,'..',logName))){
            await  fsPromises.mkdir(path.join(__dirname,'..','/logs'));
        }
        
        //After creating directory append the logData to that file
        await fsPromises.appendFile(path.join(__dirname,'..',logName),logData);

    }
    catch(err){
        console.error(err);
    }
}

const logger=(req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    console.log(`${req.method}\t ${req.path}`);
    next();
}
// module.exports(logEvents);
module.exports={logger,logEvents};
// logEvents('Hi ');