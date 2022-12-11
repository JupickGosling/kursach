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
        try {
            const {login,password} = req.body

            const isUsed = await User.findOne({login})

            if(isUsed){
                return res.json({message: 'Данный логин уже занят!'})
            }

            const salt = bcr.genSaltSync(10);
            const hash = bcr.hashSync(password, salt);

            const newUser = User({
                login, 
                password: hash,
            })

            await newUser.save();

            res.json({
                newUser, message: 'Регистрация прошла успешно!',
            })

        } catch (err) {
            res.json({message: 'Ошибка при регистрации!'})
        }
    }

    static async loginUser(req, res){
        try {
            const {login,password} = req.body
            const user = await User.findOne({login})
            if(!user){
                return res.json({message: 'Пользователя с таким логином не найдено!'})
            }

            const isPass = await bcr.compare(password, user.password)

            if(!isPass){
                return res.json({message: 'Неверный пароль!'})
            }

            const token = jwt.sign({
                id: user._id,
            }, process.env.JWT_SECRET,{expiresIn: '30d'})

            res.json({token, user, message: 'Вы в системе!'})
        } catch (err) {
            res.json({message: 'Ошибка при авторизации!'})
        }
    }

    static async getMe(req, res){
        try {
            const user = await User.findById(req.userId)

            if(!user){
                return res.json({message: 'Пользователя с таким логином не найдено!'})
            }

            const token = jwt.sign({
                id: user._id,
            }, process.env.JWT_SECRET,{expiresIn: '30d'})

            res.json({user, token})
        } catch (err) {
            res.json({message: 'Нет доступа!'})
        }
    }
}