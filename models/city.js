'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.customer, {
        foreignKey: 'idcity',
        as: 'city_has_customer',
      });

      this.belongsTo(models.country, {
        foreignKey: 'idcountry',
        as: 'city_has_country',
      });
    }
  }
  city.init(
    {
      idcountry: DataTypes.INTEGER,
      city: DataTypes.STRING(50),
      description: DataTypes.TEXT,
      created_by: DataTypes.STRING(50),
      updated_by: DataTypes.STRING(50),
      version: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'city',
    }
  );
  return city;
};
