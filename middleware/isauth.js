const jwt = require('jsonwebtoken');

module.exports = async ( req, res, next) => {
    const authheader = req.get('Authorization');
    let decodedtoken;
    if(!authheader){
        const error = new Error('Not authenticated');
        error.statuscode = 422;
        throw error;
    }
    const authtoken = authheader.split(' ')[1];
    try{
        decodedtoken = jwt.verify(authtoken, 'somesecretsecret');
    }
    catch(err){
        res.status(500).json({
            error : err,
        })
    }
    if(!decodedtoken){
        const error = new Error('Invalid token');
        error.statuscode = 422;
        throw error
    }
    req.id = decodedtoken.id;
    next();
}