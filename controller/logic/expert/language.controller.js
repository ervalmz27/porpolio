const { Op } = require('sequelize');
const { master_language, expert, customer } = require('../../../models');

class LanguageController {
  async getLanguage(req, res) {
    try {
      const language = await master_language.findAll({
        attributes: ['id', 'language'],
        order: [['language', 'ASC']],
      });
      res.status(200).json({
        language: language.map((item) => ({ id: item.id, name: item.language })),
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async getLatestLanguage(req, res) {
    const { last_update } = req.body;
    try {
      const language = await master_language.findAll({
        attributes: ['id', 'language', 'updatedAt'],
        where: {
          updatedAt: { [Op.gt]: last_update },
        },
      });
      res.status(200).json({
        latest_update: new Date(
          Math.max.apply(
            null,
            language.map((item) => item.updatedAt)
          )
        ),
        language,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async updateProfileLanguage(req, res) {
    const languages = [];
    const { language } = req.body;
    if (language) {
      const promiseLang = language.map(async (lang) => {
        const checkLanguage = await master_language.findOne({ where: { id: lang.id } });
        if (checkLanguage) {
          languages.push(lang.id);
        }
      });
      await Promise.all(promiseLang);
    }

    try {
      const cust = await customer.findOne({ where: { email: req.id.email } });

      if (cust === null || cust === undefined) {
        return res.status(404).json({
          Success: false,
          message: 'user not register as customer yet',
        });
      }

      const updateLanguage = await expert.update({ language: languages.toString() }, { where: { idcustomer: cust.id } });

      if (updateLanguage) {
        return res.status(201).json({
          Success: true,
          Message: `Id Customer ${cust.id}`,
        });
      }
      throw new Error();
    } catch (error) {
      res.status(400).json({
        Success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new LanguageController();
