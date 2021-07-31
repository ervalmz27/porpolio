const jwt = require('jsonwebtoken');

module.exports = {
    JWTMiddleware: (req, res, next) => {
        try {
            const authHeader = req.header('Authorization')
            if (authHeader.indexOf("Bearer ") >= 0) {
                const token = authHeader.split("Bearer ")
                var decoded = jwt.verify(token[1], process.env.SECRET)
                req.id = decoded
                req.jwt = token[1]
                next()
            } else {
                res.status(401).json({
                    status: false,
                    message: 'Unauthorized',
                    data: null,
                })
                return
            }
        } catch (error) {
            if (error.name === 'TypeError') {
                res.status(401).json({
                    status: false,
                    message: 'Unauthorized',
                    data: null,
                })
                return
            }
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({
                    status: false,
                    message: 'Token Expired',
                    data: null,
                })
                return
            }
            res.status(500).json({
                status: false,
                message: error.message,
                data: null,
            })
            return
        }
    }
}