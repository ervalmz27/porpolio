'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.customer, {
        foreignKey: 'idcustomer',
        as: 'expert_has_customer'
      })

      // this.hasMany(models.availability_expert, {
      //   foreignKey: 'idcostumer',
      //   as: 'expert_has_avail'
      // })
    }
  };
  expert.init({
    idcustomer: DataTypes.INTEGER,
    block_status_cust: DataTypes.BOOLEAN,
    custsignupdate: DataTypes.DATE,
    is_verified: DataTypes.BOOLEAN,
    city: DataTypes.STRING(50),
    country: DataTypes.STRING(50),
    is_expert: DataTypes.BOOLEAN,
    is_expert_time: DataTypes.DATE,
    block_status_exp: DataTypes.BOOLEAN,
    expert_about: DataTypes.TEXT,
    profileimage: DataTypes.STRING,
    profile_headline: DataTypes.STRING(145),
    // background: DataTypes.TEXT,
    language: DataTypes.TEXT,
    expertise: DataTypes.TEXT,
    currency: DataTypes.STRING(5),
    expert_rate_minute: DataTypes.DECIMAL(10, 2),
    expert_rate_hour: DataTypes.DECIMAL(10, 2),
    lastrateupdate: DataTypes.DATE,
    background_image: DataTypes.TEXT,
    avg_rating: DataTypes.DECIMAL(4, 1),
    total_call: DataTypes.INTEGER,
    total_review: DataTypes.INTEGER,
    top_review: DataTypes.TEXT,
    note_1: DataTypes.TEXT,
    note_2: DataTypes.TEXT,
    note_3: DataTypes.TEXT,
    referal_code: DataTypes.STRING(10),
    referred_by: DataTypes.STRING(10),
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'expert',
  });
  return expert;
};