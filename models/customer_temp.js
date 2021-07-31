'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer_temp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.customer_verification, {
        foreignKey: 'idcustomer_temp',
        as: 'temp_has_verification'
      })
    }
  };
  customer_temp.init({
    email: DataTypes.STRING,
    password_encrypted: DataTypes.STRING,
    device_id: DataTypes.STRING,
    updated_by: DataTypes.STRING(50),
    referral_code: DataTypes.STRING(10),
    is_expert: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING(50),
    custsignupdate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'customer_temp',
  });
  return customer_temp;
};