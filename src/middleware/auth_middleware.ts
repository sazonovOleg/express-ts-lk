const jwt = require('jsonwebtoken')

module.exports = function (req: any, res:any, next: any) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            res.status(401).json({message: " Не авторизован"})
        }

        req.user = jwt.verify(token, process.env.SECRET_KEY)

        next()
    } catch (e) {
        res.status(401).json({message: " Не авторизован"})
    }
}