const {format}=require('date-fns');
const {v4:uuid}=require('uuid');

const fs=require('fs');
const fsPromises=require('fs').promises;
const path=require('path');



const logEvents=async (message)=>{
    const time=`${format(new Date(),'yyyy-MM-dd\tHH:MM:SS')}`;
    const logData=`${time}\t${uuid()}\t${message}\n`;
    console.log(logData);
    try{
        // Check is Directory is created or not 
        // If not created then create a directory
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await  fsPromises.mkdir(path.join(__dirname,'/logs'));
        }
        
        //After creating directory append the logData to that file
        await fsPromises.appendFile(path.join(__dirname,'/logs/LogEvents.txt'),logData);

    }
    catch(err){
        console.error(err);
    }
}

// module.exports(logEvents);
module.exports=logEvents;
// logEvents('Hi ');