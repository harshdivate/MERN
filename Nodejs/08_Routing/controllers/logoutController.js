const fsPromise=require('fs').promises
const path=require('path')



const usersDB={
    users:require('../model/users.json'),
    setUsers:function(data){this.users=data}
}


const handleLogout = async ( req , res ) => {
  

    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt){ 
        console.log('Cookies .jwt does not exist');
        return res.sendStatus(204)}; //No content
    const refreshToken = cookies.jwt;

    // const refreshToken=cookies.jwt;
    // Is refresh token in DB
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt');
        console.log('Logged out user not found');
        return res.sendStatus(204); //Unauthorized 

    }
    // Delete the refresthtoken in db
    const otherUsers=usersDB.users.filter(person=> person.refreshToken!==foundUser.refreshToken);
    const currentUser={...foundUser,refreshToken:' '}
    usersDB.setUsers([...otherUsers,currentUser])
    await fsPromise.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(usersDB.users));

    res.clearCookie('jwt');
    res.sendStatus(204);

        
}

module.exports={
    handleLogout
}