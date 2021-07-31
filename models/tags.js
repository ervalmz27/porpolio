'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tags.init({
    tag_name: DataTypes.STRING(50),
    notes: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    sort_index: DataTypes.INTEGER,
    updated_by: DataTypes.STRING(50),
    created_by: DataTypes.STRING(50),
  }, {
    sequelize,
    modelName: 'tags',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return tags;
};