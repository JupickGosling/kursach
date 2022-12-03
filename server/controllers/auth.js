const bcr = require('bcryptjs')
const User = require('../models/User')

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
            res.status(409).json({
                message: 'Пользователь с таким email уже существует.'
            });
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

        // const user = req.body;
        // try {
        //     await User.create(user);
        //     res.status(201).json({message: 'User created!'});
        // } catch (err) {
        //     res.status(400).json({message: err.message});
        // }
    }

    static async loginUser(req, res){
        try {
            const user = await User.findOne({email: req.params.email, password: req.params.password});
            if(user){
                res.status(201).json({message: 'Вы успешно авторизировались!'});
            }else{
                res.status(409).json({message: 'Пользователь не найден!'})
            }
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }
}