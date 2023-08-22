
const jwt=require('jsonwebtoken');
require('dotenv').config();





const usersDB={
    users:require('../model/users.json'),
    setUsers:function(data){this.users=data}
}


const handleRefreshToken =  ( req , res ) => {
    const cookies=req.cookies
   
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken=cookies.jwt;
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //Unauthorized 
    // evaluate password 
   
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if (err || foundUser.username != decoded.username) return sendStatus(403);
            const accessToken=jwt.sign(
                {"username":decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '3000s'}
            );
            res.json({accessToken})
        }
    );
        // create JWTs
        
}

module.exports={
    handleRefreshToken
}