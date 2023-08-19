const fs=require('fs');

const rs=fs.createReadStream('newReply.txt',{encoding:'utf-8'});

const ws=fs.createWriteStream('newReplthree.txt');

// rs.on('data',(datachuck)=>{
//     ws.write(datachuck);
// })



rs.pipe(ws)

