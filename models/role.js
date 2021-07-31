'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  role.init({
    role_name: DataTypes.STRING,
    notes: DataTypes.TEXT,
    created_by: DataTypes.STRING(50),
    updated_by: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};