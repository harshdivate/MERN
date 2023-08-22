const fsPromise=require('fs').promises
const path=require('path')



const usersDB={
    users:require('../model/users.json'),
    setUsers:function(data){this.users=data}
}


const handleLogout = async ( req , res ) => {
    // On Client also delete the accessToken
    const cookies=req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken=cookies.jwt;
    // Is refresh token in DB
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt',{httpOnly:true})
        return res.sendStatus(204); //Unauthorized 

    }
    // Delete the refresthtoken in db
    const otherUsers=usersDB.users.filter(person=> person.refreshToken!==foundUser.refreshToken);
    const currentUser={...foundUser,refreshToke:''}
    usersDB.setUsers([...otherUsers,currentUser])
    await fsPromise.writeFile(path.join(__dirname,'..','model','user.json'),JSON.stringify(usersDB.users));

    res.clearCookie('jwt',{httpOnly:true});
    res.sendStatus(204);

        
}

module.exports={
    handleLogout
}