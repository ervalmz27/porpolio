
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class expertise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  expertise.init(
    {
      expertisename: DataTypes.STRING(50),
      created_by: DataTypes.STRING,
      notes: DataTypes.TEXT,
      updated_by: DataTypes.STRING,
      version: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      sort_order: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'expertise',
    }
  );
  return expertise;
};
