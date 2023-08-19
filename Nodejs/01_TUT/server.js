//Node js runs on a server - not in a browser
// The console is the terminal windwo
console.log("Hello world");
// console.log(global);

const {add,subtract,multiply,divide,pow}=require('./math');

//common core modules such as os file system commonJs imports 
// const os=require('os');
// const path=require('path');


// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());


// console.log(__dirname);
// console.log(__filename);
// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));

console.log(add(5,7));
console.log(pow(5,7));