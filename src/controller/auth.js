const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const User = require('../model/database').models.User;

const { validateName, validateEmail, validatePassword } = require('./../utils/validators');

const authSuccess = (res, token) => {
    const tokenArr = token.split('.');
    const options = {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV !== 'development',        
    }
    return res
        .status(200)
        .cookie('jwt_header', tokenArr[0], { httpOnly: true, ...options })
        .cookie('jwt_payload', tokenArr[1], options)
        .cookie('jwt_signature', tokenArr[2], { httpOnly: true, ...options })
        .json({
            success: true,
        });
}

const createToken = (user) => jwt.sign(
    { 
        id: user.id,
        name: user.name,
        emailHash: user.emailHash,
    },
    process.env.SECRET_KEY,
    { 
        expiresIn: '7d',
        audience: 'redux-auth-client',
        issuer: 'redux-auth-server',
        subject: user.emailHash,
    }
);

const logout = (req, res, next) => {
    const options = { maxAge: 0, overwrite: true }
    return res
        .status(200)
        .cookie('jwt_header', null, options)
        .cookie('jwt_payload', null, options)
        .cookie('jwt_signature', null, options)
        .json({ success: true })
    next();
}

const login = async (req, res, next) => {

    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request',
        });
    }

    try {

        const user = await User.findOne({ where: { email: email }});

        if(!user) {
            return res.status(403).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        const isValid = await user.checkPassword(password);

        if(!isValid) {
            return res.status(403).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        return authSuccess(res, createToken(user));
    } catch (err) {
        next(err);
    }
    next();
}

const signup = async (req, res, next)  => {
    
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request',
        });
    }

    if( !validateName(name) ||
        !validateEmail(email) ||    
        !validatePassword(password)
    ) {
        return res.status(403).json({
            success: false,
            message: 'Request included invalid fields',
        });
    }

    try {
        const emailHash = User.prototype.generateEmailHash(email);
        const passwordHash = await User.prototype.generatePasswordHash(password);              
        //dont allow duplicate emails
        const [ user, created ] = await User.findOrCreate({
            where: {
                email,
            },
            defaults: {
                name,
                passwordHash, 
                emailHash,
            }
        })
        if(!created) {
            return res.status(409).json({
                success: false,
                message: 'There is already an account associated with this email.',
            });
        }
        return authSuccess(res, createToken(user));
    } catch(err) {
        next(err);
    }
    next();
}

module.exports = {
    login,
    signup,
    logout,
};