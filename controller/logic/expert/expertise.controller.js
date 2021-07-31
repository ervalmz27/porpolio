const { Op } = require('sequelize');
const { expertise, expert, customer } = require('../../../models');

class ExpertiseController {
  async addExpertise(req, res) {
    try {
      if (!req.body.expertisename) {
        return res.status(400).json({
          Success: false,
          message: 'Expertise name is required',
        });
      }
      const data = await expertise.create(req.body);
      res.status(201).json({
        success: true,
        message: 'expertise successfully added',
        expertiseId: data.id,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        message: error.message,
      });
    }
  }

  async getExpertise(req, res) {
    try {
      const data = await expertise.findAll({
        attributes: ['id', 'expertisename'],
        where: {
          status: 1,
        },
        order: [
          ['sort_order', 'ASC'],
          ['expertisename', 'ASC'],
        ],
      });
      res.status(200).json({
        expertise: data.map((item) => ({ id: item.id, name: item.expertisename })),
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async getLatestExpertise(req, res) {
    const { last_update } = req.body;
    try {
      const data = await expertise.findAll({
        attributes: ['id', 'expertisename', 'updatedAt'],
        where: {
          status: 1,
          updatedAt: { [Op.gt]: last_update },
        },
      });
      res.status(200).json({
        latest_update: new Date(
          Math.max.apply(
            null,
            data.map((item) => item.updatedAt)
          )
        ),
        expertise: data,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async updateProfileExpertise(req, res) {
    try {
      const cust = await customer.findOne({ where: { email: req.id.email } });
      if (cust === null || cust === undefined) {
        return res.status(404).json({
          Success: false,
          message: 'user not register as customer yet',
        });
      }
      const expertises = [];
      const promise = req.body.expertise.map(async (exp) => {
        const checkExpert = await expertise.findOne({ where: { id: exp.id } });
        if (checkExpert) {
          expertises.push(exp.id);
        }
      });
      await Promise.all(promise);
      await expert.update({ expertise: expertises.toString() }, { where: { idcustomer: cust.id } });
      return res.status(201).json({
        Success: true,
        Message: `Id Customer ${cust.id}`,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ExpertiseController();
