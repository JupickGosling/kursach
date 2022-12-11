const jwt = require('jsonwebtoken')

module.exports = class Check {
    static async checkAuth(req,res,next){
        const token = (req.headers.autorization || '').replace(/Bearer\s?/, '')

        if(token){
            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                req.userId = decoded.id

                next()
            }catch(err){
                return res.json({message: 'Нет доступа!'})
            }
        }else{
            return res.json({message: 'Нет доступа!'})
        }
    }
}