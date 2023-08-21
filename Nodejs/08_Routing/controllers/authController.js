const path=require('path');
const bcrypt=require('bcrypt');

const userDB={
    users:require('../model/users.json'),
    setUsers:function(data){this.users=data}
}


const handleLogin = async ( req , res ) => {
    const { user , pwd } = req.body;
    if( !user || !pwd ){
        return res.sendStatus(400).json({'Message':'Enter username and password'})
    }
    const userExist=userDB.users.find(person => person.username===user);
    if(!userExist){
        return res.sendStatus(401); // Not Authorized User or User does not exist  
    }
    const matchPassword=await bcrypt.compare(pwd,userExist.password);
    if(matchPassword){
        res.json({'Success':`User ${user} is succesfully logged in!`});
    }else{
        res.sendStatus(401);
    }
}

module.exports={
    handleLogin
}