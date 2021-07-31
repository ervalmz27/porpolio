'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oauth_client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  oauth_client.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    secret: DataTypes.STRING,
    provider:DataTypes.STRING,
    redirect: DataTypes.TEXT,
    personal_access_client:DataTypes.BOOLEAN,
    password_client:DataTypes.BOOLEAN,
    revoked:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'oauth_client',
    timestamps: false,
  });
  return oauth_client;
};