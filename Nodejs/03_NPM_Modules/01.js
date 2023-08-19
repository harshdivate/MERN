const {format}=require('date-fns');
const {v4:uuid}=require('uuid');

const fs=require('fs');
const fsPromises=require('fs').promises;
const path=require('path');



const logEvents=async (message)=>{
    const time=`${format(new Date(),'yyyy-MM-dd\tHH:MM:SS')}`;
    console.log(time);
}

logEvents('hi');