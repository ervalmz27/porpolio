module.exports = {
    apikeyMiddleware: async (req, res, next) => {
        try {
            const apikey = req.headers.api_key
            if (apikey == undefined) {
                res.status(400).json({
                    status: false,
                    message: 'API Key Not Detected',
                    data: null,
                })
                next()
                return
            }
            if (apikey == process.env.API_KEY) {
                next()
                return
            } else {
                res.status(400).json({
                    status: false,
                    message: 'API Key Not Authorized',
                    data: null,
                })
                next()
                return
            }

        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                data: null,
            })
            next()
            return
        }
    }
};
