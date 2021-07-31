const fs = require('fs');
const dummyCache = require('../../../storage/cache/homepage.json');
const cache = require('../../../storage/cache/homepage_cache.json');
const { config_cache } = require('../../../models');

class CacheController {
  async getHomepageCache(req, res) {
    try {
      let data;
      const model = await config_cache.findAll();
      if (model[0].dummy) {
        data = [dummyCache];
      } else {
        data = cache;
      }
      res.status(200).json({
        cache: data,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async updateHomepageCache(req, res) {
    try {
      const { data } = req.body;
      console.log(data);
      fs.writeFileSync(`${__dirname}/../../../storage/cache/homepage_cache.json`, JSON.stringify(data), (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.status(200).json({
        Success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        Success: false,
        Message: 'Failed to update cache',
      });
    }
  }
}

module.exports = new CacheController();
