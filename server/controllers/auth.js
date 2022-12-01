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
        const user = req.body;
        try {
            await User.create(user);
            res.status(201).json({message: 'User created!'});
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }

    static async loginUser(req, res){
        const email = req.params.email;
        try {
            const user = await User.find(email);
            res.status(200).json(user);
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }
}

// module.exports.login = function(req,res){
//     res.status(200).json()({
//         login:{
//             email: req.body.email,
//             password: req.body.password,
//         }
//     })
// }

// module.exports.register = function(req,res){
//     const user = new User({
//         email: req.body.email,
//         password: req.body.password,
//     })

//     user.save().then(() => console.log('User created!'))
// }