const { config_protip } = require('../../../models');

class ProtipController {
  async getBySectionName(req, res) {
    try {
      const conds = {};
      const {section_name, id} = req.body;
      if (section_name) {
        conds.section_name = section_name;
      }
      if (id) {
        conds.id = id;
      }
      const data = await config_protip.findAll({ where: conds });
      res.status(200).json({
        protip: data,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }
}

module.exports = new ProtipController();
