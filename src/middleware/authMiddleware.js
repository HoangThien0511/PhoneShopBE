const jwt= require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const authMiddleWare = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Change 'token' to 'authorization'
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
    });
}

module.exports={
    authMiddleWare
}