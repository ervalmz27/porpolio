'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user,{
        foreignKey: 'id',
        as: 'id_has_user_role'
      })

      this.hasOne(models.user_role,{
        foreignKey: 'user_id',
        as: 'user_has_user_id'
      })
    }
  };
  user.init({
    username: DataTypes.STRING(50),
    email: DataTypes.STRING(50),
    password: DataTypes.STRING(20),
    created_by: DataTypes.STRING(50),
    updated_by: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};