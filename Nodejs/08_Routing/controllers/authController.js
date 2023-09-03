const path=require('path');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const fsPromises=require('fs').promises;




const usersDB={
    users:require('../model/users.json'),
    setUsers:function(data){this.users=data}
}


const handleLogin = async ( req , res ) => {
    // const {user,pwd} = req.body;
    
    // if( !user || !pwd ){
    //     return res.sendStatus(400).json({'Message':'Enter username and password'})
    // }
    // const userExist=userDB.users.find(person => person.username===user);
    // console.log(`User Exists value is ${userExist.users}`);
    // if(!userExist){
    //     console.log(`User does not exist`);
    //     return res.sendStatus(401); // Not Authorized User or User does not exist  
    // }
    // const matchPassword=await bcrypt.compare(pwd,userExist.password);
    // console.log(`Matched Password is ${pwd} and ${matchPassword}`);
    // if(matchPassword){
    //     // Create JWT Token
    //     const accessToken = jwt.sign(
    //         { "username": userExist.username },
    //         process.env.ACCESS_TOKEN_SECRET,
    //         { expiresIn: '300s' }
    //     );
      

    //     console.log(`Access Token is ${accessToken}`);

    //     // Create refresth token
    //     const refreshToken=jwt.sign(
    //         {"username":userExist.username},
    //         process.env.REFRESH_TOKEN_SECRET,
    //         {expiresIn:'1d'}
    //     );
        
    //     console.log(`Refresh Token is ${refreshToken}`);

    //     // Saving refresh token with current user for New Login.
    //     const otherUsers=userDB.users.filter(person => person.username !== userExist.username);
    //     // console.log(`Other Users Value is ${otherUsers}`);
    //     const currentUser= {...userExist , refreshToken};
    //     // console.log(`The value of current user is ${currentUser}`);
    //     userDB.setUsers([...otherUsers,currentUser]);
    //     await fsPromise.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(userDB.users));

    //     res.cookie('jwt',refreshToken,{ httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    //     res.json({accessToken});
    // }
    // else{
    //     res.sendStatus(401);
    // }

    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) {console.log('Not found user'); return res.sendStatus(401);} //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // create JWTs
        const roles=Object.values(foundUser.roles)
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30000s' }
        );
        const refreshToken = jwt.sign(
            {"UserInfo":{
                "username": foundUser.username,
                "roles":roles
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken);
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports={
    handleLogin
}