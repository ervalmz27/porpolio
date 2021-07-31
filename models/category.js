'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Category.init({
    category_name: DataTypes.STRING(50),
    desc: DataTypes.TEXT,
    parent_category: DataTypes.INTEGER,
    Status: DataTypes.INTEGER,
    updated_by: DataTypes.STRING(50),
    visit_count: DataTypes.INTEGER,
    image: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'category',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Category;
};