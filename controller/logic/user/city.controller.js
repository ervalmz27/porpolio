
const { Op } = require('sequelize');
const { city, country } = require('../../../models');

class CityController {
  async latestCity(req, res) {
    const { last_update } = req.body;
    try {
      await country
        .findAll({
          include: {
            model: city,
            as: 'country_has_city',
            where: {
              createdAt : { [Op.gt]: last_update },
            },
          },
        })
        .then(async (data) => {
          const listCity = [];
          let latest_city = [];
          let latest_update = new Date(last_update);
          await city
            .findAll({
              where: {
                createdAt : { [Op.gt]: last_update },
              }
            })
            .then(async (dataCity) => {
              latest_city = dataCity;
            })
          
          if (typeof data !== 'undefined' && data.length > 0)  {
            let indexCountry = data.length - 1;
            latest_update = new Date(Math.max.apply(null,latest_city.map(item => item.createdAt)));
            let count = 0;
            
            for (indexCountry; indexCountry >= 0; --indexCountry) {
              let index = data[indexCountry].country_has_city.length - 1;
  
              for (index; index >= 0; --index) {
                listCity[count] = {
                  id: data[indexCountry].country_has_city[index].id,
                  name: data[indexCountry].country_has_city[index].city,
                  country: {
                    id: data[indexCountry].id,
                    name: data[indexCountry].country,
                  },
                  created_at: data[indexCountry].country_has_city[index].createdAt
                };
                count++;
              }
            }
          }
          res.status(200).json({
            success: true,
            latest_update, 
            listCity,
          });
        });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async cityAll(req, res) {
    try {
      await country
        .findAll({
          where: {
            version: 1,
          },
          include: {
            model: city,
            as: 'country_has_city',
          },
        })
        .then(async (data) => {
          let indexCountry = data.length - 1;
          const listCity = [];
          let count = 0;
          for (indexCountry; indexCountry >= 0; --indexCountry) {
            let index = data[indexCountry].country_has_city.length - 1;

            for (index; index >= 0; --index) {
              listCity[count] = {
                id: data[indexCountry].country_has_city[index].id,
                name: data[indexCountry].country_has_city[index].city,
                country: {
                  id: data[indexCountry].id,
                  name: data[indexCountry].country,
                },
                created_at: data[indexCountry].country_has_city[index].createdAt
              };
              count++;
            }
          }

          res.status(200).json({
            success: true,
            listCity,
          });
        });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }
}

module.exports = new CityController();
