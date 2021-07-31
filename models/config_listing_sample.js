'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class config_listing_sample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  config_listing_sample.init({
    section_name: DataTypes.STRING(50),
    data: DataTypes.TEXT,
    updated_by: DataTypes.STRING(50),
  }, {
    sequelize,
    modelName: 'config_listing_sample',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return config_listing_sample;
};