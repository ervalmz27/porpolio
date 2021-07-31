const { cms_page } = require('../../../models');

class PageController {
  async getPages(req, res) {
    try {
      const conds = {};
      const {id} = req.body;
      if (id) {
        conds.id = id;
      }
      const data = await cms_page.findAll({where: conds});
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

module.exports = new PageController();
