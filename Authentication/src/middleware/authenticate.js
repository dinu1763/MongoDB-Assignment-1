const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token) =>{
    return new Promise((resolve, reject) =>{
        jwt.verify(token, process.env.JWT_ACCESS_KEY, function(err, token){
            if(err){
                return reject(err);
            }
            return resolve(token);
        })
    })
}

const authenticate = async (req, res, next) =>{
    const bearerToken = req?.header?.authorization;

    if(!bearerToken || !bearerToken.startsWith('Bearer')){
        return res.status(400).json({message:'Invalid token', status:'failed'});
    }

    const token = bearerToken.split(" ")[1];
    let user;
    try{
        user = await verifyToken(token);
    } catch(e){
        return res.status(400).json({message:"Invalid Token", status:'failed'});
    }

    req.user = user;
    return next();
}

module.exports = authenticate;