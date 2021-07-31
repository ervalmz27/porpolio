const { config_banner } = require('../../../models');

class BannerController {
  async getBySectionName(req, res) {
    try {
      const data = await config_banner.findAll({ where: { section_name: req.body.section_name, status: true } });
      res.status(200).json({
        banner: data,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }
}

module.exports = new BannerController();
