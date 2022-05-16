const  jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisisajwtsecret';

const fetchuser = (req, res, next) =>{
//get the user from jwt token and add the id to req object
const token = req.header('auth-token');
if(!token){
    res.status(401).send({error: 'please athunticate using the valid id'})
} 

try {
    const data = jwt.verify(token, JWT_SECRET);
req.user = data.user;
next();
} catch (error) {
    res.status(401).send({error: 'please athunticate using the valid id'})
}

}

module.exports = (fetchuser);