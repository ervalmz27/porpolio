'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  permission.init({
    permission_name: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    permission_status: DataTypes.BOOLEAN,
    path_permission: DataTypes.TEXT,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'permission',
  });
  return permission;
};