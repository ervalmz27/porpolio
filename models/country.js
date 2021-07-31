
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.customer, {
        foreignKey: 'idcountry',
        as: 'country_has_customer',
      });

      this.hasMany(models.city, {
        foreignKey: 'idcountry',
        as: 'country_has_city',
      });
    }
  }
  country.init(
    {
      country: DataTypes.STRING(50),
      country_code: DataTypes.STRING(5),
      created_by: DataTypes.STRING(50),
      updated_by: DataTypes.STRING(50),
      version: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'country',
    }
  );
  return country;
};
