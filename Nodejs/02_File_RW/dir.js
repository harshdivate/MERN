const fs=require('fs');


if(!fs.existsSync('./new')){
    fs.mkdir('./new',(err)=>{
        if (err) throw err;
        console.log(`Createdd newe directory`);
    })
}




if(fs.existsSync('./new')){
    console.log('Directory Exist');
    fs.rmdir('./new',(err)=>{
        if (err) throw err;
        console.log(`Deleted newe directory`);
    })
    
}