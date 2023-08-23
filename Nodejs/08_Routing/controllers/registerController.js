const fsPromises=require('fs').promises;
const path=require('path');
// Bcryp is used to encrypt
const bcrypt=require('bcrypt');



const userDB={
    users:require('../model/users.json'),
    setUsers:function (data){this.users=data}
}


const handleNewUser= async (req,res)=>{
    const {user,pwd}=req.body;
    if(!user || !pwd){
        return res.status(400).json({"MEssage":"Username and Password are required"})
    }

    // Check for duplicate username in database
    const duplicate=userDB.users.find(person=> person.username===user);
    if(duplicate){
        return res.sendStatus(409); // Conflict
    }
    try{
        // Encrypt the password
        const hashedPwd=await bcrypt.hash(pwd,10);
        console.log(hashedPwd);
        // Store the new User
        const newUser={"username":user,"password":hashedPwd};
       
        userDB.setUsers([...userDB.users,newUser]);
        console.log(`Writing file `);
        await fsPromises.writeFile(path.join(__dirname,"..","model","users.json"),
        JSON.stringify(userDB.users));

        console.log(userDB.users);
        res.status(201).json({'success':`New user ${user} created`})
    }
    catch(err){
        res.status(500).json({"Message":err.message})
    }
}


module.exports={
    handleNewUser
};