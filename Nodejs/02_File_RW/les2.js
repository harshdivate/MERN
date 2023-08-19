

const fs=require('fs').promises;
const nfs=require('fs');

async function readFile(path,encoding){
    const result=await fs.readFile(path,encoding);
    console.log(result);
}


async function writeFile(path,text){
    const result=await fs.writeFile(path,text);
    console.log("Data written");
}
const path='./append.txt';
const encoding='utf-8';
// writeFile('./www.txt','Hello');
// readFile(path,encoding);

//Creation of new directory

if(!nfs.existsSync('.www')){
    nfs.mkdir('.ww2');
    console.log('Directory Created');
}