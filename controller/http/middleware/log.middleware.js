const { login_audit } = require('../../../models');
// const { Op } = require('sequelize');
// const { addListener } = require('nodemon');

module.exports = {
  logMiddleware: async (req, res) => {
    try {
      await login_audit.create({
        idcustomer: req.id,
        status: true,
        activity: req.activity,
        session: req.session,
        device_id: 'ios',
        isBiodataFilled: req.isBiodataFilled,
      });
      res.status(200).json({
        token_type: 'Bearer',
        tokenJWT: req.token,
        id_customer: req.id,
        is_expert: req.expert,
        isBiodataFilled: req.isBiodataFilled,
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: 'no data temporary',
      });
    }
  },
};
