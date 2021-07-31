'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oauth_access_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  oauth_access_token.init({
    user_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    scopes: DataTypes.TEXT,
    revoked:DataTypes.BOOLEAN,
    expires_at:DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'oauth_access_token',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return oauth_access_token;
};