
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.country, {
        foreignKey: 'idcountry',
        as: 'customer_has_id_country',
      });

      this.belongsTo(models.city, {
        foreignKey: 'idcity',
        as: 'customer_has_id_city',
      });

      this.hasOne(models.expert, {
        foreignKey: 'idcustomer',
        as: 'customer_has_expert',
      });

      // this.hasOne(models.customer_verification, {
      //   foreignKey: 'idcostumer',
      //   as: 'customer_has_verification'
      // })

      // this.hasMany(models.login_audit, {
      //   foreignKey: 'idcostumer',
      //   as: 'customer_has_audit'
      // })

      // this.hasMany(models.availability_expert, {
      //   foreignKey: 'idcostumer',
      //   as: 'customer_has_expert'
      // })
    }
  }
  customer.init(
    {
      email: DataTypes.STRING(30),
      password_encrypted: DataTypes.STRING,
      fname: DataTypes.STRING(50),
      lname: DataTypes.STRING(50),
      birthdate: DataTypes.DATE,
      idcity: DataTypes.INTEGER,
      city: DataTypes.STRING(50),
      idcountry: DataTypes.INTEGER,
      country: DataTypes.STRING(50),
      block_status_cust: DataTypes.BOOLEAN,
      custsignupdate: DataTypes.DATE,
      is_verified: DataTypes.BOOLEAN,
      is_expert: DataTypes.BOOLEAN,
      // is_expert_time: DataTypes.DATE,
      // block_status_exp: DataTypes.DATE,
      // expert_about: DataTypes.TEXT,
      profileimage: DataTypes.TEXT,
      // language: DataTypes.TEXT,
      // expertise: DataTypes.TEXT,
      // currency: DataTypes.STRING(5),
      // expert_rate_minute: DataTypes.DECIMAL(10, 2),
      // expert_rate_hour: DataTypes.DECIMAL(10, 2),
      // lastrateupdate: DataTypes.DATE,
      note1: DataTypes.TEXT,
      note2: DataTypes.TEXT,
      note3: DataTypes.TEXT,
      created_by: DataTypes.STRING(20),
      updated_by: DataTypes.STRING(20),
    },
    {
      sequelize,
      modelName: 'customer',
    }
  );
  return customer;
};
