'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class availability_expert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.customer, {
      //   foreignKey: 'idcostumer',
      //   as: 'expert_has_customer'
      // })
      // this.belongsTo(models.expert, {
      //   foreignKey: 'idcostumer',
      //   as: 'avail_has_expert'
      // })
    }
  };
  availability_expert.init({
    available_day: DataTypes.STRING(10),
    start_time: DataTypes.STRING(6),
    finish_time: DataTypes.STRING(6),
    idcustomer: DataTypes.INTEGER,
    available_day_id: DataTypes.INTEGER,
    is_everyday: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'availability_expert',
  });
  return availability_expert;
};