const bcr = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
module.exports = class AUTH {

    static async fetchAllUser(req, res){
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }

    static async registerUser(req, res){
        const condit = await User.findOne({email: req.body.email});
        if(condit){
            res.status(409).json({message: 'Пользователь с таким email уже существует.'});
        }else{
            const sait = bcr.genSaltSync(10);
            const password = req.body.password;
            const user = new User({
                email: req.body.email,
                password: bcr.hashSync(password, sait)
            });

            try {
                await user.save();
                res.status(201).json({message: 'Пользователь успешно зарегистирован!'});
            } catch (err) {
                res.status(400).json({message: err.message});
            }
        }
    }

    static async loginUser(req, res){
        const condit = await User.findOne({email: req.body.email});
        if(condit){
            const pass = bcr.compareSync(req.body.password, condit.password);
            if(pass){
                const token = jwt.sign({
                    email: condit.email,
                    userId: condit._id
                }, keys.jwt, {expiresIn: 60*60})
                res.status(201).json({token: token})
            }else{
                res.status(401).json({message: 'В ввели не правильный пароль. Попробуйте снова.'});
            }
        }else{
            res.status(404).json({message: 'Пользователя с таким email не существует.'});
        }
    }
}