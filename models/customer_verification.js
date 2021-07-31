'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer_verification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Customer, {
      //   foreignKey: 'idcostumer',
      //   as: 'verification_has_customer'
      // })

      this.belongsTo(models.customer_temp, {
        foreignKey: 'idcustomer_temp',
        as: 'verification_has_temp'
      })
    }
  };
  customer_verification.init({
    idcustomer: DataTypes.INTEGER,
    verificationtime: DataTypes.DATE,
    verifycode: DataTypes.STRING(6),
    expiretime: DataTypes.DATE,
    notes: DataTypes.STRING(50),
    status: DataTypes.BOOLEAN,
    idcustomer_temp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'customer_verification',
  });
  return customer_verification;
};