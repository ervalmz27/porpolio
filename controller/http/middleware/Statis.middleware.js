const {oauth_client} = require("../../../models")

module.exports = {
    async StatisMiddleware(req,res,next) {
        try {
            const authHeader = req.header('Authorization')
            if (authHeader.indexOf("Bearer ") >= 0) {
                const token = authHeader.split("Bearer ")
                const statoken = await oauth_client.findOne({where:{secret:token[1]}})
                if (!statoken) {
                    res.status(401).json({
                        status: false,
                        message: 'Unauthorized',
                        data: null,
                    })
                }
                next()
            } else {
                res.status(401).json({
                    status: false,
                    message: 'Unauthorized',
                    data: null,
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message,
                data: null,
            })
        }
    }
}