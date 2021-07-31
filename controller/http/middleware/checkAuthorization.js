const {
  customer,
  oauth_access_token
} = require('../../../models')

const checkAuthorization = async (req, res, next) => {
  try {
    const cekBanned = await customer.findOne({
      where: {
        email: req.id.email
      }
    })

    const cekSession = await oauth_access_token.findOne({
      where: {
        id: req.jwt
      }
    })

    if (cekBanned.block_status_cust === true || cekSession.revoked === true) {
      res.status(401).json({
        "success": false,
        "code": "LOG-USERBLOCKED",
        "message": "user blocked",
        "is_expert": cekBanned.is_expert,
        "data": null,
        "result": null
      })
      return
    } 
      next()
    
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "token not found, please login first",
      data: null,
    });
  }
}

module.exports = checkAuthorization