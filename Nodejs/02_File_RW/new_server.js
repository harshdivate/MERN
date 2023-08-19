const fs=require('fs');
const path=require('path');


// const readFile=async ()=>{
//     try{
//         const read=await fsPromises.readFile('./append.txt',{encoding:'utf-8'});
//         console.log(read);
//         const write=await fsPromises.appendFile('./append.txt','\n\nAppend using Promises');
//         console.log('Append using promise');
//         const read_one=await fsPromises.readFile('./append.txt',{encoding:'utf-8'});
//         console.log(read_one);
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// readFile();

//Creatin and removing direcotr
if(!fs.existsSync('./new')){

    fs.mkdir('./new',(err)=>{
        if (err) throw err;
        console.log('Created directory');
    });
}
