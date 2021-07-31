const {
    customer,
    oauth_access_token
} = require('../../../models')

const {
    Op
} = require('sequelize');

checkSession = async (req, res, next) => {
    try {
        const cekSession = await oauth_access_tokens.findOne({
            where: {
                email: req.id.email,
            }
        })

        if (cekSession.revoked == false) {
            next()
        }
        res.status(401).json({
            status: false,
            message: "access denied",
            data: null,
        });
        return

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: error.message,
            data: null,
        });
    }
}

module.exports = checkSession