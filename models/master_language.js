'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_language.init(
    {
      language: DataTypes.STRING(50),
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
      version: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'master_language',
    }
  );
  return master_language;
};
