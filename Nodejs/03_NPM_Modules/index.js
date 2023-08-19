const logE=require('./logEventss');

// logE('hi');
const EventEmitter=require('events');

class MyEmitter extends EventEmitter{};

const myEmitter=new MyEmitter();


//Registration of event log after it is called with message 
// call the events function
myEmitter.on('log',(msg)=>logE(msg));

setTimeout(()=>{
    myEmitter.emit('log','Log event emitted');
},2000);
