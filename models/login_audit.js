'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class login_audit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.customer, {
      //   foreignKey: 'idcountry',
      //   as: 'audit_has_customer'
      // })
    }
  };
  login_audit.init({
    idcustomer: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    activity: DataTypes.TEXT,
    session: DataTypes.STRING(50),
    device_id: DataTypes.STRING,
    isBiodataFilled: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'login_audit',
  });
  return login_audit;
};