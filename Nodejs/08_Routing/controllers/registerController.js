const userDB={
    users:require('../model/users.json'),
    setUsers:function (data){this.users=data}
}
console.log(userDB);
console.log(userDB.users);

const fsPromises=require('fs').fsPromises;
const path=require('path');
const bcrypt=require('bcrypt');




const handleNewUser= async (req,res)=>{
    const {user,pwd}=req.body;
    if(!user || !pwd){
        return res.status(400).json({"MEssage":"Username and Password are required"})
    }

    // Check for duplicate username in database
    const duplicate=userDb.users.find(person=> person.username===user);
    if(duplicate){
        return res.sendStatus(409);
    }
    try{
    }
    catch(err){
        console.log(err);
    }
}

