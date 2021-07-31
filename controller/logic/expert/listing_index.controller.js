const { listing_index } = require('../../../models');

class ListingIndexController {
  async getListingIndex(req, res) {
    try {
      const data = await listing_index.findAll();
      res.status(200).json({
        sucess: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: error.message,
      });
    }
  }
}

module.exports = new ListingIndexController();
