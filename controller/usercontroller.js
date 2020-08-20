const User = require('../schema/userschema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup_user = async ( req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    try{
        const hashpwd = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name : name,
            email : email,
            username : username,
            password : hashpwd
        })
        try{
            const registeruser = await user.save();
            res.status(201).json({
                message : 'User successfully created',
                createdUser : registeruser
            })
        }
        catch(err){
            res.status(422).json({
                error : err
            })
        }  
    }
    catch(err){
        res.status(422).json({
            error : err
        })
    }
}


exports.login_user = async ( req, res, next ) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const existinguser = await User.findOne({ username : username})
        if(!existinguser){
            res.status(500).json({
                error : 'User not found'
            })
        }
        try{
            const isequal = await bcrypt.compare(password, existinguser.password);
            if(!isequal){
                res.status(422).json({
                    error : 'Incorrect password'
                })
            }
            const token = jwt.sign({ id : existinguser._id.toString(), username : existinguser.username}, 'somesecretsecret', {expiresIn : '1h'});
            res.status(200).json({
                message : 'You are logged in',
                tokendata : {
                    token : token,
                    expiresIn : new Date(new Date().getTime() + 7200750).toUTCString(),
                },
                user : existinguser
            })
        }
        catch(err){
            res.status(500).json({
                error : err
            })
        }  
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    }
}