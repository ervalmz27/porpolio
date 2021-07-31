const { Op } = require('sequelize');
const { tags, customer, expert_listing } = require('../../../models');

class TagsController {
  async addTag(req, res) {
    try {
      if (!req.body.tag_name) {
        return res.status(400).json({
          Success: false,
          message: 'Tag name is required',
        });
      }
      const requestbody = req.body;
      const customerData = await customer.findOne({ where: { email: req.id.email } });  
      if (customerData) {
        const data = await tags.create({
          tag_name: requestbody.tag_name,
          created_by: customerData.fname,
          updated_by: customerData.fname,
          status: true,
        });
        res.status(201).json({
          Success: true,
          Message: `Tags successfully added`,
          tagId: data.id,
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        Success: false,
        message: error.message,
      });
    }
  }

  async getTags(req, res) {
    try {
      const tag = await tags.findAll({
        where: {
          status: true,
        },
      });
      res.status(200).json({
        tags: tag.map((item) => ({ id: item.id, name: item.tag_name, sort_index: item.sort_index })),
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async getLatestTags(req, res) {
    const { last_update } = req.body;
    try {
      const tag = await tags.findAll({
        where: {
          updated_at: { [Op.gt]: last_update },
        },
      });
      res.status(200).json({
        latest_update:
          tag.length > 0
            ? new Date(
                Math.max.apply(
                  null,
                  tag.map((item) => item.updated_at)
                )
              )
            : new Date(last_update),
        tags: tag,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async getTagsByExpert(req, res) {
    try {
      const result = [];
      const cust = await customer.findOne({ where: { email: req.id.email } });
      const user = await expert_listing.findOne({
        where: { idCustomer: cust.id },
      });
      if (!user) {
        res.status(500).json({
          Success: false,
          Message: 'User not an expert',
        });
      }
      const dtags = user.tags.split(',');
      // eslint-disable-next-line no-restricted-syntax
      for (const dtag of dtags) {
        const data = tags.findOne({ where: { tag_name: dtag } });
        result.push(data);
      }
      res.status(200).json({
        tags: result,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }
}

module.exports = new TagsController();
