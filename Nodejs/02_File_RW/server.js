const fsPromises=require('fs').promises;

const path=require('path');

const fileOps=async()=>{
    try{
     const data=await fsPromises.readFile(path.join(__dirname,'.','newReply.txt'),'utf-8');
     console.log(data);
     await fsPromises.writeFile(path.join(__dirname,'.','promiseWrite.txt'),data)
     await fsPromises.appendFile(path.join(__dirname,'.','promiseWrite.txt'),'Hi this is append text');
     await fsPromises.rename(path.join(__dirname,'.','promiseWrite.txt'),path.join(__dirname,'.','promiseRename.txt'));
     await fsPromises.unlink(path.join(__dirname,'.','lorem.txt'));


    }
    catch(err){
        console.log(err);
    }
}

fileOps();


// fs.readFile(path.join(__dirname,'.','lorem.txt'),'utf-8',(err,data)=>{
//     if (err) throw err;
//     console.log(data);
// })




// console.log('Hello');


// fs.writeFile(path.join(__dirname,'.','reply.txt'),'Nice to meet you',(err)=>{
//     if (err) throw err;
//     console.log("Write complete");
// })


// fs.appendFile(path.join(__dirname,'.','append.txt'),'Nice to meet you',(err)=>{
//     if (err) throw err;
//     console.log("Append complete");
// })


// fs.writeFile(path.join(__dirname,'.','reply.txt'),'Hi my name is harsh',(err)=>{
//     if (err) throw err;
//     console.log('Write complete');

//     fs.appendFile(path.join(__dirname,'.','reply.txt'),'\n\nNice to meet you harsh',(err)=>{
//         if (err) throw err;
//         console.log("Append Complete");


//         //Rename file 
//         fs.rename(path.join(__dirname,'.','reply.txt'),path.join(__dirname,'.','newReply.txt'),(err)=>{
//             if (err) throw err;
//             console.log("Rename complete");
//         })
//     })
//     })


process.on('uncaughtException',err=>{
    console.error('Threre was an uncaugth error');
    process.exit(1);
})